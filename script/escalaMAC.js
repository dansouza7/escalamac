function clickCalcular(){

	var dia = document.getElementById('selEscala').value;
	var qtdDias = document.getElementById('qtdDias').value;

	var escalas = ['Manhã','Tarde','Noite', 'Largando','Folga'];
	var dataHoje = new Date();
	const diaSemana = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];


    var indexEscalaAtual = escalas.indexOf(dia);
    var countDias = 0;
    
    //criando colunas e títulos da tabela
    $('#divTabelaEscala').empty();

	var table = criarTabelaeCabecalho();
	
	
    for (var i = 0; i <= qtdDias; i++) {
    	countDias++;
    	indexEscalaAtual++;

    	if (indexEscalaAtual==5) {
    		indexEscalaAtual = 0;
    	}

    	//incremento de datas
    	let dataIncremento = new Date();
    	dataIncremento = new Date(dataIncremento.setDate(dataHoje.getDate() + countDias));
    	let dataFormatada = ((dataIncremento.getDate() )) + "/" + ((dataIncremento.getMonth() + 1)) + "/" + dataIncremento.getFullYear(); 
		
		var row = $('<tr></tr>');
		var rowData = $('<td></td>').text(dataFormatada);
		row.append(rowData);

    	//pegando o dia da semana referente a data incrementada
    	let day = diaSemana[dataIncremento.getDay()];
		var rowData = $('<td></td>').text(day);
		row.append(rowData);

		//imprimindo a escala referente ao dia
		var rowData = $('<td></td>').text(escalas[indexEscalaAtual]);
		row.append(rowData);
		table.append(row);	
    }

    $('#divTabelaEscala').append(table);

}

function criarTabelaeCabecalho() {
      
    //criando colunas e títulos da tabela
    $('#divTabelaEscala').empty();

	var table = $('<table></table>');
	var row = $('<tr></tr>');
	var rowData = $('<th></th>').text('Data');
	row.append(rowData);

	var rowData = $('<th></th>').text('Dia Semana');
	row.append(rowData);

	var rowData = $('<th></th>').text('Escala');
	row.append(rowData);

	table.append(row);

	return table
}

function onlyNumberKey(evt) {
      
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}