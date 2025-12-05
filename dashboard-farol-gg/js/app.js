// State
let currentView = 'dashboard-mensal';
let currentResponsible = 'Todos';
let currentCategory = 'Todos';
let searchTerm = '';

const STORAGE_KEY = 'farol_gg_data';
const HISTORY_KEY = 'farol_gg_history';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadDataFromStorage();
    initNavigation();
    initFilters();
    initAdmin();
    renderMonthlyDashboard();
    renderAnnualDashboard();
    renderIndicatorsList();
});

// Navigation
function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            switchView(view);
        });
    });
}

function switchView(view) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-view') === view) {
            btn.classList.add('active');
        }
    });
    document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
    });
    document.getElementById(view).classList.add('active');
    currentView = view;
}

// Filters
function initFilters() {
    const responsibleFilter = document.getElementById('filter-responsible');
    const categoryFilter = document.getElementById('filter-category');
    const searchInput = document.getElementById('search-indicator');
    
    if (responsibleFilter) {
        responsibles.forEach(resp => {
            const option = document.createElement('option');
            option.value = resp;
            option.textContent = resp;
            responsibleFilter.appendChild(option);
        });
        responsibleFilter.addEventListener('change', (e) => {
            currentResponsible = e.target.value;
            renderMonthlyDashboard();
        });
    }
    
    if (categoryFilter) {
        ['Todos','Estratégico','Tático','Business Partner','Operacional'].forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });
        categoryFilter.addEventListener('change', (e) => {
            currentCategory = e.target.value;
            renderIndicatorsList();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value.toLowerCase();
            renderIndicatorsList();
        });
    }
}

// Monthly Dashboard
function renderMonthlyDashboard() {
    const tbody = document.getElementById('monthly-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    const filteredIndicators = currentResponsible === 'Todos' 
        ? indicators 
        : indicators.filter(ind => ind.responsible === currentResponsible);
    
    filteredIndicators.forEach(indicator => {
        const tr = document.createElement('tr');
        const tdIndicator = document.createElement('td');
        tdIndicator.className = 'col-indicator';
        tdIndicator.textContent = `${indicator.id}. ${indicator.name}`;
        tr.appendChild(tdIndicator);
        
        const tdResponsible = document.createElement('td');
        tdResponsible.className = 'col-responsible';
        tdResponsible.textContent = indicator.responsible;
        tr.appendChild(tdResponsible);
        
        months.forEach(month => {
            const monthData = monthlyData.find(
                d => d.indicatorId === indicator.id && d.month === month
            );
            const td = document.createElement('td');
            const statusDiv = document.createElement('div');
            statusDiv.className = `status-cell ${monthData ? monthData.status : 'gray'}`;
            statusDiv.textContent = (monthData && monthData.status !== 'gray') ? '✓' : '-';
            td.appendChild(statusDiv);
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

// Annual Dashboard
function renderAnnualDashboard() {
    renderStatusChart();
    renderPerformanceTable();
}

function renderStatusChart() {
    const ctx = document.getElementById('statusChart');
    if (!ctx) return;
    
    const statusCounts = { green: 0, yellow: 0, red: 0 };
    indicators.forEach(indicator => {
        const indicatorData = monthlyData.filter(d => d.indicatorId === indicator.id);
        const measuredData = indicatorData.filter(d => d.status !== 'gray');
        if (measuredData.length > 0) {
            const greenCount = measuredData.filter(d => d.status === 'green').length;
            const yellowCount = measuredData.filter(d => d.status === 'yellow').length;
            const redCount = measuredData.filter(d => d.status === 'red').length;
            if (greenCount > yellowCount && greenCount > redCount) statusCounts.green++;
            else if (yellowCount > greenCount && yellowCount > redCount) statusCounts.yellow++;
            else if (redCount > 0) statusCounts.red++;
            else statusCounts.green++;
        }
    });
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Verde', 'Amarelo', 'Vermelho'],
            datasets: [{
                data: [statusCounts.green, statusCounts.yellow, statusCounts.red],
                backgroundColor: ['#28A745', '#FFA500', '#ED1941'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function renderPerformanceTable() {
    const container = document.getElementById('performance-table');
    if (!container) return;
    container.innerHTML = '';
    
    const header = document.createElement('div');
    header.style.cssText = 'display:grid;grid-template-columns:200px 1fr 1fr 1fr;gap:1rem;padding:.75rem 1rem;background:#144492;color:#fff;font-size:.85rem;font-weight:700;border-radius:6px;margin-bottom:.5rem';
    header.innerHTML = '<div>Responsável</div><div style="text-align:center">Verde</div><div style="text-align:center">Amarelo</div><div style="text-align:center">Vermelho</div>';
    container.appendChild(header);
    
    responsibles.slice(1).forEach(resp => {
        const respIndicators = indicators.filter(ind => ind.responsible === resp);
        const stats = { green: 0, yellow: 0, red: 0, total: respIndicators.length };
        respIndicators.forEach(indicator => {
            const indicatorData = monthlyData.filter(d => d.indicatorId === indicator.id);
            const measuredData = indicatorData.filter(d => d.status !== 'gray');
            if (measuredData.length > 0) {
                const greenCount = measuredData.filter(d => d.status === 'green').length;
                const yellowCount = measuredData.filter(d => d.status === 'yellow').length;
                const redCount = measuredData.filter(d => d.status === 'red').length;
                if (greenCount > yellowCount && greenCount > redCount) stats.green++;
                else if (yellowCount > greenCount && yellowCount > redCount) stats.yellow++;
                else if (redCount > 0) stats.red++;
                else stats.green++;
            }
        });
        
        const row = document.createElement('div');
        row.style.cssText = 'display:grid;grid-template-columns:200px 1fr 1fr 1fr;gap:1rem;padding:.75rem 1rem;background:#F8F9FA;border-radius:6px';
        const greenPct = ((stats.green / stats.total) * 100).toFixed(0);
        const yellowPct = ((stats.yellow / stats.total) * 100).toFixed(0);
        const redPct = ((stats.red / stats.total) * 100).toFixed(0);
        row.innerHTML = `<div style="font-weight:700">${resp}</div><div style="text-align:center;font-weight:800;color:#28A745">${greenPct}%</div><div style="text-align:center;font-weight:800;color:#FFA500">${yellowPct}%</div><div style="text-align:center;font-weight:800;color:#ED1941">${redPct}%</div>`;
        container.appendChild(row);
    });
}

// Indicators List
function renderIndicatorsList() {
    const container = document.getElementById('indicators-list');
    if (!container) return;
    container.innerHTML = '';
    
    let filteredIndicators = indicators;
    if (currentCategory !== 'Todos') {
        filteredIndicators = filteredIndicators.filter(ind => ind.category === currentCategory);
    }
    if (searchTerm) {
        filteredIndicators = filteredIndicators.filter(ind => 
            ind.name.toLowerCase().includes(searchTerm) ||
            ind.responsible.toLowerCase().includes(searchTerm) ||
            ind.formula.toLowerCase().includes(searchTerm)
        );
    }
    
    filteredIndicators.forEach(indicator => {
        const card = document.createElement('div');
        card.className = 'indicator-card';
        card.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem">
                <div style="background:#144492;color:#fff;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.95rem">${indicator.id}</div>
                <div style="padding:.35rem .75rem;background:#E9ECEF;color:#343A40;border-radius:20px;font-size:.75rem;font-weight:700;text-transform:uppercase">${indicator.category}</div>
            </div>
            <div style="font-size:1.1rem;font-weight:800;color:#212529;margin-bottom:.75rem">${indicator.name}</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1rem">
                <div><div style="font-size:.75rem;font-weight:700;color:#6C757D;text-transform:uppercase;margin-bottom:.25rem">Responsável</div><div style="font-size:.95rem;font-weight:700;color:#212529">${indicator.responsible}</div></div>
                <div><div style="font-size:.75rem;font-weight:700;color:#6C757D;text-transform:uppercase;margin-bottom:.25rem">Frequência</div><div style="font-size:.95rem;font-weight:700;color:#212529">${indicator.frequency}</div></div>
                <div><div style="font-size:.75rem;font-weight:700;color:#6C757D;text-transform:uppercase;margin-bottom:.25rem">Meta 2026</div><div style="font-size:.95rem;font-weight:700;color:#212529">${indicator.target}</div></div>
                <div><div style="font-size:.75rem;font-weight:700;color:#6C757D;text-transform:uppercase;margin-bottom:.25rem">Cargo</div><div style="font-size:.95rem;font-weight:700;color:#212529">${indicator.responsibleRole}</div></div>
            </div>
            <div style="background:#F8F9FA;padding:1rem;border-radius:6px;margin-bottom:1rem">
                <div style="font-size:.75rem;font-weight:700;color:#6C757D;text-transform:uppercase;margin-bottom:.5rem">Fórmula de Cálculo</div>
                <div style="font-family:'Courier New',monospace;font-size:.9rem;font-weight:600;color:#212529;line-height:1.5">${indicator.formula}</div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem">
                <div style="padding:.5rem;border-radius:4px;text-align:center;background:#28A745;color:#fff"><div style="font-size:.7rem;font-weight:700;text-transform:uppercase;margin-bottom:.25rem">Verde</div><div style="font-size:.8rem;font-weight:800">${indicator.green}</div></div>
                <div style="padding:.5rem;border-radius:4px;text-align:center;background:#FFA500;color:#fff"><div style="font-size:.7rem;font-weight:700;text-transform:uppercase;margin-bottom:.25rem">Amarelo</div><div style="font-size:.8rem;font-weight:800">${indicator.yellow}</div></div>
                <div style="padding:.5rem;border-radius:4px;text-align:center;background:#ED1941;color:#fff"><div style="font-size:.7rem;font-weight:700;text-transform:uppercase;margin-bottom:.25rem">Vermelho</div><div style="font-size:.8rem;font-weight:800">${indicator.red}</div></div>
            </div>
        `;
        container.appendChild(card);
    });
    
    if (filteredIndicators.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#6C757D;padding:2rem">Nenhum indicador encontrado.</p>';
    }
}

// Admin Section
function initAdmin() {
    const selectIndicator = document.getElementById('select-indicator');
    indicators.forEach(indicator => {
        const option = document.createElement('option');
        option.value = indicator.id;
        option.textContent = `${indicator.id}. ${indicator.name}`;
        selectIndicator.appendChild(option);
    });
    
    const updateForm = document.getElementById('update-form');
    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const indicatorId = parseInt(document.getElementById('select-indicator').value);
        const month = document.getElementById('select-month').value;
        const value = document.getElementById('input-value').value;
        if (!indicatorId || !month || !value) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        const indicator = indicators.find(ind => ind.id === indicatorId);
        const status = calculateStatus(indicator, value);
        const index = monthlyData.findIndex(d => d.indicatorId === indicatorId && d.month === month);
        if (index !== -1) {
            monthlyData[index].status = status;
            monthlyData[index].value = value;
        } else {
            monthlyData.push({indicatorId, month, status, value});
        }
        saveDataToStorage();
        addToHistory(indicatorId, month, value, status);
        renderMonthlyDashboard();
        renderAnnualDashboard();
        updateForm.reset();
        alert(`✓ Indicador atualizado!\n\nIndicador: ${indicator.name}\nMês: ${month}\nValor: ${value}\nStatus: ${status.toUpperCase()}`);
    });
    
    document.getElementById('btn-export').addEventListener('click', exportData);
    document.getElementById('btn-import').addEventListener('click', () => {
        document.getElementById('import-file-input').click();
    });
    document.getElementById('import-file-input').addEventListener('change', importData);
    document.getElementById('btn-clear').addEventListener('click', clearAllData);
    renderHistory();
}

function calculateStatus(indicator, valueStr) {
    const cleanValue = valueStr.replace(/[%hpts]/gi, '').trim();
    const value = parseFloat(cleanValue);
    if (isNaN(value)) return 'gray';
    const green = indicator.green;
    if (green.includes('≥') || green.startsWith('≥')) {
        const threshold = parseFloat(green.replace(/[≥%hpts]/gi, ''));
        return value >= threshold ? 'green' : 'red';
    } else if (green.includes('≤') || green.startsWith('≤')) {
        const threshold = parseFloat(green.replace(/[≤%hpts]/gi, ''));
        return value <= threshold ? 'green' : 'red';
    }
    return 'gray';
}

function loadDataFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            const data = JSON.parse(stored);
            data.forEach(item => {
                const index = monthlyData.findIndex(d => d.indicatorId === item.indicatorId && d.month === item.month);
                if (index !== -1) monthlyData[index] = item;
                else monthlyData.push(item);
            });
        } catch (e) {}
    }
}

function saveDataToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(monthlyData));
    } catch (e) {
        alert('Erro ao salvar dados.');
    }
}

function loadHistory() {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return [];
        }
    }
    return [];
}

function saveHistory(history) {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {}
}

function addToHistory(indicatorId, month, value, status) {
    const history = loadHistory();
    const indicator = indicators.find(ind => ind.id === indicatorId);
    history.unshift({
        indicatorId,
        indicatorName: indicator.name,
        month,
        value,
        status,
        timestamp: new Date().toISOString()
    });
    if (history.length > 50) history.pop();
    saveHistory(history);
    renderHistory();
}

function renderHistory() {
    const container = document.getElementById('update-history');
    const history = loadHistory();
    if (history.length === 0) {
        container.innerHTML = '<p class="empty-state">Nenhuma atualização ainda.</p>';
        return;
    }
    container.innerHTML = '';
    history.forEach(item => {
        const div = document.createElement('div');
        div.style.cssText = 'background:#F8F9FA;padding:1rem;border-radius:6px;border-left:4px solid #144492';
        const date = new Date(item.timestamp);
        const dateStr = date.toLocaleString('pt-BR', {day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'});
        const statusText = {green:'Verde',yellow:'Amarelo',red:'Vermelho'};
        div.innerHTML = `<div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><div style="font-weight:800">${item.indicatorName}</div><div style="font-size:.75rem;font-weight:600;color:#6C757D">${dateStr}</div></div><div style="display:flex;gap:1rem;font-size:.85rem;font-weight:600;color:#495057"><span style="color:#144492">Mês: ${item.month}</span><span>Valor: ${item.value}</span><span>${statusText[item.status]}</span></div>`;
        container.appendChild(div);
    });
}

function exportData() {
    const data = {monthlyData: monthlyData, history: loadHistory(), exportDate: new Date().toISOString()};
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `farol-gg-dados-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('✓ Dados exportados!');
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            if (!data.monthlyData) {
                alert('Arquivo inválido.');
                return;
            }
            if (confirm('Deseja importar? Isso substituirá todos os dados atuais.')) {
                monthlyData.length = 0;
                monthlyData.push(...data.monthlyData);
                saveDataToStorage();
                if (data.history) saveHistory(data.history);
                renderMonthlyDashboard();
                renderAnnualDashboard();
                renderHistory();
                alert('✓ Dados importados!');
            }
        } catch (error) {
            alert('Erro ao importar dados.');
        }
    };
    reader.readAsText(file);
    e.target.value = '';
}

function clearAllData() {
    if (confirm('Tem certeza que deseja limpar TODOS os dados?')) {
        if (confirm('CONFIRMAÇÃO FINAL: Todos os dados serão perdidos. Continuar?')) {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(HISTORY_KEY);
            location.reload();
        }
    }
}
