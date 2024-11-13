function createTableHeader() {
    const headers = ['Data', 'Dia Semana', 'Escala'];
    const row = $('<tr class="header-row"></tr>');
    
    headers.forEach(header => {
        const th = $('<th></th>').text(header);
        row.append(th);
    });
    
    return row;
}

function formatDate(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function createTableRow(date, dayName, scale) {
    const row = $('<tr class="scale-row"></tr>');
    const isWeekend = dayName === "Domingo" || dayName === "Sábado";
    
    [date, dayName, scale].forEach((text, index) => {
        const td = $('<td></td>').text(text);
        
        // Add weekend class only to date and day columns (index 0 and 1)
        if (isWeekend && index < 2) {
            td.addClass('weekend-day');
        }
        
        // Add scale class for the last column
        if (index === 2) {
            td.addClass(`scale-${text.toLowerCase().replace('ã', 'a')}`);
        }
        
        row.append(td);
    });
    return row;
}

function clickCalcular() {
    const selectedScale = document.getElementById('selEscala').value;
    const numberOfDays = document.getElementById('qtdDias').value;
    
    if (!numberOfDays) return; // Don't calculate if no days entered
    
    const scales = ['Manhã', 'Tarde', 'Noite', 'Largando', 'Folga'];
    const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const today = new Date();
    
    let currentScaleIndex = scales.indexOf(selectedScale);
    
    // Create table
    $('#divTabelaEscala').empty();
    const table = $('<table class="scale-table"></table>');
    table.append(createTableHeader());
    
    // Generate rows
    for (let i = 0; i <= numberOfDays; i++) {
        currentScaleIndex = currentScaleIndex >= 4 ? 0 : currentScaleIndex + 1;
        
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i + 1);
        
        const formattedDate = formatDate(currentDate);
        const dayName = weekDays[currentDate.getDay()];
        const scale = scales[currentScaleIndex];
        
        table.append(createTableRow(formattedDate, dayName, scale));
    }
    
    $('#divTabelaEscala').append(table);

    // Smooth scroll to table after it's created
    setTimeout(() => {
        document.getElementById('divTabelaEscala').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
        });
    }, 100);
}

function onlyNumberKey(evt) {
    const keyCode = evt.which || evt.keyCode;
    const isValidKey = keyCode <= 31 || (keyCode >= 48 && keyCode <= 57);
    return isValidKey;
}

// Add event listener for Enter key
document.addEventListener('DOMContentLoaded', function() {
    const inputDias = document.getElementById('qtdDias');
    inputDias.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            clickCalcular();
        }
    });
});