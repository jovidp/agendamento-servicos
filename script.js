"use strict";

const STORAGE = {
  users: "agf_users_v1",
  logs: "agf_logs_v1",
  appointments: "agf_appointments_v1",
  services: "agf_services_v1",
  session: "agf_session_v1",
  settings: "agf_settings_v1"
};

const defaultServices = [
  { id: 1, name: "Corte de cabelo", description: "Corte personalizado com acabamento e finalização.", duration: 45, price: 45, icon: "✂️" },
  { id: 2, name: "Barba", description: "Modelagem, acabamento e cuidado completo da barba.", duration: 30, price: 35, icon: "🪒" },
  { id: 3, name: "Manicure", description: "Cuidado das unhas, cutículas e esmaltação.", duration: 50, price: 40, icon: "💅" },
  { id: 4, name: "Design de sobrancelha", description: "Design e alinhamento respeitando o formato do rosto.", duration: 30, price: 30, icon: "✨" }
];
let services = [];
const appointmentTimes = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

let currentUser = null;
let pendingTwoFAUserId = null;
let twoFAState = { type: null, attempts: 0 };
let confirmAction = null;
let fontScale = 16;
let serviceEditingId = null;

const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];
const getUsers = () => JSON.parse(localStorage.getItem(STORAGE.users) || "[]");
const setUsers = users => localStorage.setItem(STORAGE.users, JSON.stringify(users));
const getLogs = () => JSON.parse(localStorage.getItem(STORAGE.logs) || "[]");
const setLogs = logs => localStorage.setItem(STORAGE.logs, JSON.stringify(logs));
const getAppointments = () => JSON.parse(localStorage.getItem(STORAGE.appointments) || "[]");
const setAppointments = data => localStorage.setItem(STORAGE.appointments, JSON.stringify(data));
const getStoredServices = () => JSON.parse(localStorage.getItem(STORAGE.services) || "[]");
const setStoredServices = data => localStorage.setItem(STORAGE.services, JSON.stringify(data));

function uid(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

async function hashText(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, "0")).join("");
}

async function seedData() {
  if (!localStorage.getItem(STORAGE.users)) {
    const masterHash = await hashText("adminabc");
    const users = [{
      id: "usr_master",
      fullName: "Administrador Master",
      birthDate: "1990-01-01",
      sex: "Não informado",
      motherName: "Maria Administradora",
      cpf: "000.000.001-91",
      email: "master@sistema.local",
      cellPhone: "(+55)21-99999999",
      landline: "(+55)21-33333333",
      address: { cep: "20000-000", street: "Cadastro interno", number: "0", neighborhood: "Centro", city: "Rio de Janeiro", state: "RJ", complement: "" },
      login: "master",
      passwordHash: masterHash,
      role: "master",
      createdAt: new Date().toISOString()
    }];
    setUsers(users);
  }
  if (!localStorage.getItem(STORAGE.logs)) setLogs([]);
  if (!localStorage.getItem(STORAGE.appointments)) setAppointments([]);
  if (!localStorage.getItem(STORAGE.services)) setStoredServices(defaultServices);
  services = getStoredServices().map(service => ({ ...service, active: service.active !== false }));
  setStoredServices(services);
}

function showToast(title, message, type = "info") {
  const container = $("#toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4200);
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[ch]));
}

function showView(name) {
  if (["schedule", "appointments", "database"].includes(name) && !currentUser) return showView("login");
  if (["users", "logs", "services-admin"].includes(name) && currentUser?.role !== "master") return showForbidden();
  if (name === "password" && currentUser?.role !== "common") return showForbidden();

  $$(".view").forEach(v => v.classList.remove("active-view"));
  const view = $(`#view-${name}`);
  if (!view) return;
  view.classList.add("active-view");

  $$(".nav-link[data-view]").forEach(btn => btn.classList.toggle("active", btn.dataset.view === name));
  if (name === "users") renderUsers();
  if (name === "logs") renderLogs();
  if (name === "services-admin") renderServicesAdmin();
  if (name === "appointments") renderAppointments();
  if (name === "schedule") setMinDate();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showForbidden() {
  $("#errorMessage").textContent = "Seu perfil não possui acesso a esta funcionalidade.";
  showView("error");
}

function updateAuthUI() {
  const authenticated = Boolean(currentUser);
  $$(".guest-only").forEach(el => el.classList.toggle("hidden", authenticated));
  $$(".auth-only").forEach(el => el.classList.toggle("hidden", !authenticated));
  $$(".master-only").forEach(el => el.classList.toggle("hidden", currentUser?.role !== "master"));
  $$(".common-only").forEach(el => el.classList.toggle("hidden", currentUser?.role !== "common"));
  const badge = $("#userBadge");
  badge.classList.toggle("hidden", !authenticated);
  badge.textContent = authenticated ? `${currentUser.login} • ${currentUser.role === "master" ? "Master" : "Comum"}` : "";
}

function restoreSession() {
  const id = sessionStorage.getItem(STORAGE.session);
  if (!id) return;
  currentUser = getUsers().find(u => u.id === id) || null;
  updateAuthUI();
}

function logout() {
  currentUser = null;
  pendingTwoFAUserId = null;
  sessionStorage.removeItem(STORAGE.session);
  updateAuthUI();
  showToast("Sessão encerrada", "Logout realizado com sucesso.", "success");
  showView("login");
}

function isAlphabeticName(value) {
  return /^[A-Za-zÀ-ÿ ]+$/.test(value.trim());
}
function isAlphabeticExact(value, size) {
  return new RegExp(`^[A-Za-zÀ-ÿ]{${size}}$`).test(value);
}
function normalizeDigits(value) { return String(value).replace(/\D/g, ""); }

function validateCPF(cpf) {
  const digits = normalizeDigits(cpf);
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
  const calc = base => {
    let sum = 0;
    for (let i = 0; i < base; i++) sum += Number(digits[i]) * (base + 1 - i);
    const mod = (sum * 10) % 11;
    return mod === 10 ? 0 : mod;
  };
  return calc(9) === Number(digits[9]) && calc(10) === Number(digits[10]);
}

function maskCPF(value) {
  const d = normalizeDigits(value).slice(0, 11);
  return d.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
function maskCEP(value) {
  const d = normalizeDigits(value).slice(0, 8);
  return d.replace(/(\d{5})(\d)/, "$1-$2");
}
function maskPhone(value) {
  const d = normalizeDigits(value).replace(/^55/, "").slice(0, 10);
  if (!d) return "";
  const ddd = d.slice(0, 2);
  const number = d.slice(2);
  return `(+55)${ddd}${number ? "-" + number : ""}`;
}
function validPhone(value) {
  return /^\(\+55\)\d{2}-\d{8}$/.test(value);
}

async function lookupCEP() {
  const cepInput = $("#cep");
  const cep = normalizeDigits(cepInput.value);
  if (cep.length !== 8) {
    showToast("CEP inválido", "Informe um CEP com 8 dígitos.", "error");
    return;
  }
  try {
    $("#btnCep").disabled = true;
    $("#btnCep").textContent = "Buscando...";
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) throw new Error("Falha na consulta");
    const data = await response.json();
    if (data.erro) throw new Error("CEP não encontrado");
    $("#street").value = data.logradouro || "";
    $("#neighborhood").value = data.bairro || "";
    $("#city").value = data.localidade || "";
    $("#state").value = data.uf || "";
    showToast("CEP localizado", "Endereço preenchido automaticamente.", "success");
  } catch (err) {
    showToast("Consulta indisponível", "Preencha o endereço manualmente.", "error");
  } finally {
    $("#btnCep").disabled = false;
    $("#btnCep").textContent = "Buscar CEP";
  }
}

async function handleRegister(event) {
  event.preventDefault();
  const form = event.currentTarget;
  $$("input, select", form).forEach(el => el.classList.remove("invalid"));

  const fullName = $("#fullName").value.trim();
  const birthDate = $("#birthDate").value;
  const sex = $("#sex").value;
  const motherName = $("#motherName").value.trim();
  const cpf = $("#cpf").value.trim();
  const email = $("#email").value.trim();
  const cellPhone = $("#cellPhone").value.trim();
  const landline = $("#landline").value.trim();
  const cep = $("#cep").value.trim();
  const street = $("#street").value.trim();
  const number = $("#number").value.trim();
  const neighborhood = $("#neighborhood").value.trim();
  const city = $("#city").value.trim();
  const state = $("#state").value.trim().toUpperCase();
  const complement = $("#complement").value.trim();
  const login = $("#newLogin").value.trim();
  const password = $("#newPassword").value;
  const confirmPassword = $("#confirmPassword").value;

  const required = [
    ["#fullName", fullName], ["#birthDate", birthDate], ["#sex", sex], ["#motherName", motherName], ["#cpf", cpf],
    ["#email", email], ["#cellPhone", cellPhone], ["#landline", landline], ["#cep", cep], ["#street", street], ["#number", number],
    ["#neighborhood", neighborhood], ["#city", city], ["#state", state], ["#newLogin", login], ["#newPassword", password], ["#confirmPassword", confirmPassword]
  ];
  const missing = required.filter(([, value]) => !value);
  missing.forEach(([selector]) => $(selector).classList.add("invalid"));
  if (missing.length) return showToast("Campos obrigatórios", "Preencha todos os campos marcados com *.", "error");

  if (fullName.length < 15 || fullName.length > 80 || !isAlphabeticName(fullName)) {
    $("#fullName").classList.add("invalid");
    return showToast("Nome inválido", "Use de 15 a 80 caracteres alfabéticos.", "error");
  }
  if (!validateCPF(cpf)) {
    $("#cpf").classList.add("invalid");
    return showToast("CPF inválido", "O dígito verificador do CPF não confere.", "error");
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) return showToast("E-mail inválido", "Informe um endereço de e-mail válido.", "error");
  if (!validPhone(cellPhone) || !validPhone(landline)) return showToast("Telefone inválido", "Use o formato (+55)XX-XXXXXXXX.", "error");
  if (normalizeDigits(cep).length !== 8) return showToast("CEP inválido", "O CEP deve ter 8 dígitos.", "error");
  if (!isAlphabeticExact(login, 6)) return showToast("Login inválido", "O login deve possuir exatamente 6 letras.", "error");
  if (!isAlphabeticExact(password, 8)) return showToast("Senha inválida", "A senha deve possuir exatamente 8 letras.", "error");
  if (password !== confirmPassword) return showToast("Senhas diferentes", "Senha e confirmação devem ser iguais.", "error");

  const users = getUsers();
  if (users.some(u => u.login.toLowerCase() === login.toLowerCase())) return showToast("Login em uso", "Escolha outro login.", "error");
  if (users.some(u => normalizeDigits(u.cpf) === normalizeDigits(cpf))) return showToast("CPF já cadastrado", "Já existe um usuário com este CPF.", "error");

  const passwordHash = await hashText(password);
  users.push({
    id: uid("usr"), fullName, birthDate, sex, motherName, cpf, email, cellPhone, landline,
    address: { cep, street, number, neighborhood, city, state, complement },
    login, passwordHash, role: "common", createdAt: new Date().toISOString()
  });
  setUsers(users);
  form.reset();
  showToast("Cadastro realizado", "Usuário salvo. Agora faça login.", "success");
  showView("login");
}

async function handleLogin(event) {
  event.preventDefault();
  const login = $("#loginUser").value.trim();
  const password = $("#loginPassword").value;
  if (!login || !password) return showToast("Campos obrigatórios", "Preencha login e senha.", "error");

  const user = getUsers().find(u => u.login.toLowerCase() === login.toLowerCase());
  if (!user || user.passwordHash !== await hashText(password)) {
    $("#errorMessage").textContent = "Falha na autenticação. Login ou senha inválidos.";
    showView("error");
    return;
  }

  pendingTwoFAUserId = user.id;
  twoFAState = { type: ["mother", "birth", "cep"][Math.floor(Math.random() * 3)], attempts: 0 };
  const questions = {
    mother: "Qual o nome da sua mãe?",
    birth: "Qual a data do seu nascimento?",
    cep: "Qual o CEP do seu endereço?"
  };
  $("#twofaQuestion").textContent = questions[twoFAState.type];
  $("#twofaAnswer").value = "";
  $("#twofaAttempts").textContent = "";
  showView("twofa");
}

function normalize2FA(value, type) {
  if (type === "cep") return normalizeDigits(value);
  if (type === "birth") {
    const clean = value.trim();
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(clean)) {
      const [d,m,y] = clean.split("/"); return `${y}-${m}-${d}`;
    }
    return clean;
  }
  return value.trim().toLocaleLowerCase("pt-BR").replace(/\s+/g, " ");
}

function handleTwoFA(event) {
  event.preventDefault();
  const answer = $("#twofaAnswer").value.trim();
  if (!answer) return showToast("Resposta obrigatória", "Informe a resposta do segundo fator.", "error");
  const user = getUsers().find(u => u.id === pendingTwoFAUserId);
  if (!user) return showView("login");

  const expected = twoFAState.type === "mother" ? user.motherName : twoFAState.type === "birth" ? user.birthDate : user.address.cep;
  if (normalize2FA(answer, twoFAState.type) === normalize2FA(expected, twoFAState.type)) {
    currentUser = user;
    sessionStorage.setItem(STORAGE.session, user.id);
    const logs = getLogs();
    logs.unshift({ id: uid("log"), userId: user.id, fullName: user.fullName, cpf: user.cpf, dateTime: new Date().toISOString(), factor: twoFAState.type });
    setLogs(logs);
    pendingTwoFAUserId = null;
    updateAuthUI();
    showToast("Acesso autorizado", `Bem-vindo, ${user.login}.`, "success");
    showView("home");
    return;
  }

  twoFAState.attempts++;
  const remaining = 3 - twoFAState.attempts;
  if (remaining <= 0) {
    pendingTwoFAUserId = null;
    $("#twofaAttempts").textContent = "3 tentativas sem sucesso! Favor realizar Login novamente.";
    showToast("2FA bloqueado", "3 tentativas sem sucesso. Faça login novamente.", "error");
    setTimeout(() => showView("login"), 1200);
  } else {
    $("#twofaAttempts").textContent = `Resposta incorreta. Restam ${remaining} tentativa(s).`;
  }
}

function renderServices() {
  $("#serviceCards").innerHTML = services.map(s => `
    <article class="service-card">
      <div class="service-icon" aria-hidden="true">${s.icon}</div>
      <h3>${escapeHtml(s.name)}</h3>
      <p>${escapeHtml(s.description)}</p>
      <div class="service-meta"><span>${s.duration} min</span><span>R$ ${s.price.toFixed(2).replace(".", ",")}</span></div>
    </article>`).join("");

  $("#serviceSelect").innerHTML = `<option value="">Selecione</option>${services.map(s => `<option value="${s.id}">${escapeHtml(s.name)} — R$ ${s.price.toFixed(2).replace(".", ",")}</option>`).join("")}`;
}

function setMinDate() {
  const today = new Date();
  const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0,10);
  $("#appointmentDate").min = local;
}

function handleSchedule(event) {
  event.preventDefault();
  if (!currentUser) return showView("login");
  const serviceId = Number($("#serviceSelect").value);
  const date = $("#appointmentDate").value;
  const time = $("#appointmentTime").value;
  const notes = $("#appointmentNotes").value.trim();
  if (!serviceId || !date || !time) return showToast("Dados incompletos", "Selecione serviço, data e horário.", "error");
  const when = new Date(`${date}T${time}:00`);
  if (when < new Date()) return showToast("Data inválida", "Escolha uma data e horário futuros.", "error");

  const appointments = getAppointments();
  const occupied = appointments.some(a => a.date === date && a.time === time && a.status === "CONFIRMADO");
  if (occupied) return showToast("Horário indisponível", "Este horário já está ocupado. Escolha outro.", "error");

  appointments.push({ id: uid("ag"), userId: currentUser.id, serviceId, date, time, notes, status: "CONFIRMADO", createdAt: new Date().toISOString() });
  setAppointments(appointments);
  event.currentTarget.reset();
  showToast("Agendamento confirmado", "Seu horário foi reservado com sucesso.", "success");
  showView("appointments");
}

function renderAppointments() {
  const users = getUsers();
  let data = getAppointments();
  if (currentUser?.role === "common") data = data.filter(a => a.userId === currentUser.id);
  data.sort((a,b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  $("#appointmentsSubtitle").textContent = currentUser?.role === "master" ? "Visão de todos os agendamentos do sistema." : "Seus próximos atendimentos e histórico.";
  const tbody = $("#appointmentsTableBody");
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-state">Nenhum agendamento encontrado.</td></tr>`;
    return;
  }
  tbody.innerHTML = data.map(a => {
    const user = users.find(u => u.id === a.userId);
    const service = services.find(s => s.id === a.serviceId);
    const canCancel = a.status === "CONFIRMADO" && (currentUser?.role === "master" || a.userId === currentUser?.id);
    return `<tr>
      <td>${escapeHtml(user?.fullName || "Usuário removido")}</td>
      <td>${escapeHtml(service?.name || "Serviço")}</td>
      <td>${formatDate(a.date)}</td>
      <td>${escapeHtml(a.time)}</td>
      <td><span class="status-pill ${a.status === "CONFIRMADO" ? "status-confirmed" : "status-cancelled"}">${a.status}</span></td>
      <td>${canCancel ? `<button class="btn secondary compact" data-cancel-appointment="${a.id}">Cancelar</button>` : "—"}</td>
    </tr>`;
  }).join("");
}

function formatDate(date) {
  if (!date) return "";
  const [y,m,d] = date.split("-"); return `${d}/${m}/${y}`;
}

function renderUsers() {
  if (currentUser?.role !== "master") return;
  const term = $("#userSearch").value.trim().toLocaleLowerCase("pt-BR");
  const users = getUsers().filter(u => u.role === "common" && (!term || u.fullName.toLocaleLowerCase("pt-BR").includes(term)));
  const tbody = $("#usersTableBody");
  if (!users.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-state">Nenhum usuário comum encontrado.</td></tr>`;
    return;
  }
  tbody.innerHTML = users.map(u => `<tr>
    <td>${escapeHtml(u.fullName)}</td>
    <td>${escapeHtml(u.cpf)}</td>
    <td>${escapeHtml(u.login)}</td>
    <td>${escapeHtml(u.email)}</td>
    <td><button type="button" class="btn danger compact" data-delete-user="${u.id}">Excluir</button></td>
  </tr>`).join("");
}

function askConfirm(text, action) {
  $("#confirmText").textContent = text;
  confirmAction = action;
  $("#confirmModal").classList.remove("hidden");
  $("#confirmYes").focus();
}
function closeConfirm() {
  $("#confirmModal").classList.add("hidden");
  confirmAction = null;
}

function deleteUser(id) {
  let users = getUsers();
  const user = users.find(u => u.id === id);
  if (!user || user.role !== "common") return;
  users = users.filter(u => u.id !== id);
  setUsers(users);
  showToast("Usuário excluído", `${user.fullName} foi removido do sistema.`, "success");
  renderUsers();
}

async function handlePasswordChange(event) {
  event.preventDefault();
  if (currentUser?.role !== "common") return showForbidden();
  const currentPassword = $("#currentPassword").value;
  const next = $("#changedPassword").value;
  const confirm = $("#changedPasswordConfirm").value;
  if (!currentPassword || !next || !confirm) return showToast("Campos obrigatórios", "Preencha todos os campos.", "error");
  if (currentUser.passwordHash !== await hashText(currentPassword)) return showToast("Senha atual incorreta", "Confira a senha informada.", "error");
  if (!isAlphabeticExact(next, 8)) return showToast("Nova senha inválida", "Use exatamente 8 letras.", "error");
  if (next !== confirm) return showToast("Senhas diferentes", "A nova senha e a confirmação devem ser iguais.", "error");

  const users = getUsers();
  const index = users.findIndex(u => u.id === currentUser.id);
  users[index].passwordHash = await hashText(next);
  setUsers(users);
  currentUser = users[index];
  event.currentTarget.reset();
  showToast("Senha alterada", "Sua senha foi atualizada com sucesso.", "success");
}

function renderLogs() {
  if (currentUser?.role !== "master") return;
  const type = $("#logFilterType").value;
  const value = $("#logFilterValue").value.trim().toLocaleLowerCase("pt-BR");
  let logs = getLogs().slice().sort((a,b) => new Date(b.dateTime) - new Date(a.dateTime));
  if (value && type === "name") logs = logs.filter(l => l.fullName.toLocaleLowerCase("pt-BR").includes(value));
  if (value && type === "cpf") logs = logs.filter(l => normalizeDigits(l.cpf).includes(normalizeDigits(value)));
  const labels = { mother: "Nome da mãe", birth: "Data de nascimento", cep: "CEP" };
  const tbody = $("#logsTableBody");
  if (!logs.length) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty-state">Nenhum log encontrado.</td></tr>`;
    return;
  }
  tbody.innerHTML = logs.map(l => `<tr>
    <td>${new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "medium" }).format(new Date(l.dateTime))}</td>
    <td>${escapeHtml(l.fullName)}</td>
    <td>${escapeHtml(l.cpf)}</td>
    <td>${escapeHtml(labels[l.factor] || l.factor)}</td>
  </tr>`).join("");
}

function saveAccessibility() {
  localStorage.setItem(STORAGE.settings, JSON.stringify({ contrast: document.body.classList.contains("high-contrast"), fontScale }));
}
function restoreAccessibility() {
  const settings = JSON.parse(localStorage.getItem(STORAGE.settings) || "{}");
  if (settings.contrast) document.body.classList.add("high-contrast");
  fontScale = Number(settings.fontScale) || 16;
  document.documentElement.style.setProperty("--base-font-size", `${fontScale}px`);
  $("#btnContrast").setAttribute("aria-pressed", String(Boolean(settings.contrast)));
}

function setupEvents() {
  document.addEventListener("click", event => {
    const viewBtn = event.target.closest("[data-view]");
    if (viewBtn) showView(viewBtn.dataset.view);

    const deleteBtn = event.target.closest("[data-delete-user]");
    if (deleteBtn) {
      const id = deleteBtn.dataset.deleteUser;
      const user = getUsers().find(u => u.id === id);
      if (user) askConfirm(`Deseja realmente excluir o usuário ${user.fullName}?`, () => deleteUser(id));
    }

    const cancelBtn = event.target.closest("[data-cancel-appointment]");
    if (cancelBtn) {
      const id = cancelBtn.dataset.cancelAppointment;
      askConfirm("Deseja cancelar este agendamento?", () => {
        const data = getAppointments();
        const item = data.find(a => a.id === id);
        if (item) item.status = "CANCELADO";
        setAppointments(data);
        renderAppointments();
        showToast("Agendamento cancelado", "O horário foi cancelado.", "success");
      });
    }
  });

  $("#btnLogout").addEventListener("click", logout);
  $("#registerForm").addEventListener("submit", handleRegister);
  $("#loginForm").addEventListener("submit", handleLogin);
  $("#twofaForm").addEventListener("submit", handleTwoFA);
  $("#scheduleForm").addEventListener("submit", handleSchedule);
  $("#passwordForm").addEventListener("submit", handlePasswordChange);
  $("#btnCep").addEventListener("click", lookupCEP);
  $("#cep").addEventListener("blur", () => { if (normalizeDigits($("#cep").value).length === 8) lookupCEP(); });
  $("#cpf").addEventListener("input", e => e.target.value = maskCPF(e.target.value));
  $("#cep").addEventListener("input", e => e.target.value = maskCEP(e.target.value));
  $("#cellPhone").addEventListener("input", e => e.target.value = maskPhone(e.target.value));
  $("#landline").addEventListener("input", e => e.target.value = maskPhone(e.target.value));
  $("#userSearch").addEventListener("input", renderUsers);
  $("#logFilterType").addEventListener("change", renderLogs);
  $("#logFilterValue").addEventListener("input", renderLogs);
  $("#btnUsersPdf").addEventListener("click", () => window.print());

  $("#confirmYes").addEventListener("click", () => {
    const action = confirmAction;
    closeConfirm();
    if (action) action();
  });
  $("#confirmNo").addEventListener("click", closeConfirm);
  $("#confirmModal").addEventListener("click", e => { if (e.target.id === "confirmModal") closeConfirm(); });

  $("#btnContrast").addEventListener("click", e => {
    document.body.classList.toggle("high-contrast");
    e.currentTarget.setAttribute("aria-pressed", String(document.body.classList.contains("high-contrast")));
    saveAccessibility();
  });
  $("#btnFontUp").addEventListener("click", () => {
    fontScale = Math.min(20, fontScale + 1);
    document.documentElement.style.setProperty("--base-font-size", `${fontScale}px`);
    saveAccessibility();
  });
  $("#btnFontDown").addEventListener("click", () => {
    fontScale = Math.max(14, fontScale - 1);
    document.documentElement.style.setProperty("--base-font-size", `${fontScale}px`);
    saveAccessibility();
  });
}

(async function init() {
  await seedData();
  restoreAccessibility();
  restoreSession();
  renderServices();
  setMinDate();
  setupEvents();
  updateAuthUI();
  showView("home");
})();
