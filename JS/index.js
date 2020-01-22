
console.log("FUNCIONA");

//FUNCION QUE RECIBE COMO PARAMETRO LO QUE EL USUARIO TECLEO EN INPUT

function fetchNew2(nuevo){
    
   //AQUI DECLARAMOS NUESTRA KEY PREVIAMENTE OBTENIDA Y USAMOS GET PARA LOS VALORES DE
   //DATA

    var key = 'AIzaSyByQNJH84q-YDlKLag12nr025dQAbyX9D8';
	var url = 'https://www.googleapis.com/youtube/v3/search';

  	$.ajax({
  		type: 'GET',
  		url : url,
  		data: {
      		part: "snippet",
      		q : nuevo,
      		key: "AIzaSyByQNJH84q-YDlKLag12nr025dQAbyX9D8",
      		type: "video",
      		maxResults:10,
      		pageToken: $("#botonesPaginas").val(),
      		videoEmbeddable: true,
      },

      success : function(data){
        video(data);
      },
      error : function( err ){
        console.log( "NO JALO" );
      }
    });
     
}

//UNA VEZ QUE OBTUVIMOS LOS VALORES SE MANDA LLAMAR LA FUNCION VIDEO DONDE USAREMOS
//LOS VALORES OBTENIDOS EN FETCHNEW2

function video(data){

	//CON ESTAS CONDICIONES ACTIVAMOS LOS BOTONES EN CASO DE QUE HAYA UNA PAGINA 
	//SIGUIENTE O ANTERIOR

	$('.botonesV').show();
	if (typeof data.prevPageToken == "undefined"){
		$("#anterior").hide();
	} else{

		$("#anterior").show();


	}
	if (typeof data.nextPageToken == "undefined"){
		$("#siguiente").hide();
	} else{

		$("#siguiente").show();
		
		
	}

	$("#anterior").val(data.prevPageToken);
	$("#siguiente").val(data.nextPageToken);

	let results = $( '.results' );

	var nombreVideo, imgVideo;

	//EN ESTA FUNCION DECLARAMOS LAS VARIABLES OBTENIDAS POR EL HANDLE DEL ITEM, TAL COMO
	// EL TITULO, LA IMAGEN Y EL ID PARA APLICAR EL URL A LOS ELEMENTOS
	//AL FINAL LE HACEMOS APPEND A RESULTADOS PARA MOSTRARLOS

	$.each(data.items, function(i,item){

		
		videoTitulo = item.snippet.title;
		videoImg = item.snippet.thumbnails.medium.url;
		videoId = item.id.videoId;

		imgVideo = "<li><img alt='" + videoTitulo + "' src='" + videoImg + "' width='120' height='90'</li></img>"

		nombreVideo = '<li>'+videoTitulo+'</li>';

		linkVideo = '<a href = "https://www.youtube.com/watch?v=' + videoId + '" target = "blank">'+imgVideo+'</a>';

		linkNombre = '<a href = "https://www.youtube.com/watch?v=' + videoId + '" target = "blank">'+nombreVideo+'</a>';

		

		$('.results').append(linkNombre);
		$('.results').append(linkVideo);
		
		
	});



}


//FUNCION A LA QUE MANDA LLAMAR EL CLICK DE SUBMIT PARA TOMAR EL VALOR DEL INPUT
function watchForm(){
  
  let nuevo = $("#int").val();
 
  fetchNew2(nuevo);
 
}

//EN ESTA FUNCION REVISAMOS LOS BOTONES

function init(){

 $('#submit').click(function(e){

		 e.preventDefault();
	 	$("li").remove();
		 watchForm();
		 
		 
	});	

 //CON EL BOTON DE SIGUIENTE SE MANDA A LLAMAR DIRECTO LA FUNCION DE OBTENCION DE DATOS
 //CON EL MISMO INPUT, SE COLOCO UN REMOVE PARA QUE SIMULARA LA "SIGUIENTE PAGINA"
 //SI NO SE REMUEVE LO QUE YA ESTABA, APARECERIA LOS NUEVOS RESULTADOS DEBAJO

 $("#siguiente").click(function(e) {

 		  $("li").remove();
          $("#botonesPaginas").val($("#siguiente").val());
          watchForm();
      });

 $("#anterior").click(function(e) {

 		   $("li").remove();
          $("#botonesPaginas").val($("#anterior").val());
          watchForm();
      });


  
}

init();
