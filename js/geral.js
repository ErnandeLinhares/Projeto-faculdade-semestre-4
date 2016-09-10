$(document).ready(function(){

	$('a[href*="w3.org"]').click(function() {
        var currentUrl = window.location.href;
        var w3cValidation = currentUrl;

        if ($(this).is('[href*="css-validator"'))
          w3cValidation = "http://jigsaw.w3.org/css-validator/validator?uri="+currentUrl;
        else
          w3cValidation = "http://validator.w3.org/check?uri="+currentUrl;

        window.open(w3cValidation);
        return false;
    });

	$("#cad_juridica").hide(); //esconde o formulario juridico 
	$("#cad_pessoa").hide();   //esconde o formulario pes fisica
	$("#cad_btn_fisica").click(function(){
		$(".container_cadastro_fj").css("background","#eee");	
		$("#cad_juridica").slideUp();
		$("#cad_pessoa").slideDown();	
	});
	$("#cad_btn_juridica").click(function(){
		$(".container_cadastro_fj").css("background","#eee");	
		$("#cad_pessoa").slideUp();
		$("#cad_juridica").slideDown();	
	});
	
	
	$(".btn_ui").button(); //atribuir a classe botao do jquery ui
	$(".inputtext").click(function(){ //apaga e escreve o valor do campo de busca
		if($(this).val() === "O que você procura?"){
			$(this).val('');
		}
	}).blur(function(){
		if($(this).val() === ""){
			$(this).val('O que você procura?');
		}
	}); //apaga e escreve o valor do campo de busca
        
    $('.carousel').cycle({ //jquery cicle - usado inicialmente no banner da home
		fx:     'blindX', 
		easing: 'easeOutBounce', 
		delay:  -2000,
		pause:   1 
	});
    
    $('.imgZoom').elevateZoom({ zoomType:'lens', lensShape:'round', lensSize:'150' });
    
  /* ---- CARRINHO DE COMPRAS- HTML5 LOCAL STORAGE -----------------*/
    $('a').click(function(){
		localStorage.setItem('dados', $("#carrinho-produtos").html());
		localStorage.setItem('itens', $(".intens_carrinho").html());
		localStorage.setItem('total', $(".total-amount").html());
	});
	
	if (localStorage.getItem('dados')){      
	    $("#carrinho-produtos").html(localStorage.getItem('dados'));		
	}
	if (localStorage.getItem('itens')) {      
	    $(".intens_carrinho").html(localStorage.getItem('itens'));		
	}
	if (localStorage.getItem('total')) {      
	    $(".total-amount").html(localStorage.getItem('total'));		
	}
	
	 $("#limpar").click(function() {
	    localStorage.clear();
	    window.location = window.location;
	});	

});// fechando o jquery

/*------------------- CARRINHO DE COMPRAS ---------------------------*/

var timerCarrinho = '';
$(function(){
	$(window).scroll(function(){
        var wtop	 	= $(this).scrollTop();
		var carrinho 	= $('#header');
		var cheight 	= $(carrinho).height();
        if( wtop > ( cheight / 1 ) ) {	
            $('#shopping-cart').slideDown(1000);           
        }
        else{        	
        	$('#shopping-cart').slideUp(1000);
        }
    });

	$('.vitrineProdutos li').draggable({
		cursor: "move",
		revert:true,		
		helper: 'clone',
		start: function(){
			clearTimeout( timerCarrinho );
			$('#carrinho-container').show();
			$('#shopping-cart').slideDown(1000);
		}
	});
	
	
	$('#carrinho-produtos').droppable({
		cursor: "move",
		hoverClass: 'ui-state-hover',
		accept: '.produto-dd',
		drop: function( event, ui ){		
			$(this).find('.adicione').remove();
			var cod = ui.draggable.find('.produto-id').val();
			var price = ui.draggable.find('.preco_real').attr('title');				
			$(".total").text(cod);
			
			if( $(this).find('#clone-'+cod).length == 0 )
			{
				$('<li id="clone-'+cod+'" style="display:none;"></li>').html(ui.draggable.html()).prependTo( this );
				$(this).find('li:first').slideDown();
				var total_produtos = $(this).find('li').length;
				
				var at = $("#total").val();
				var total = (parseFloat(at)+ parseFloat(price));
				$("#total").val(total);
				$('#carrinho-info').html('<p>' + total_produtos + ' produto' + ( total_produtos > 1 ? 's' : '' ) + '</p>Total: <span class="total">'+total.toFixed(2)+'</span>' );
				$('.total-amount').text(total.toFixed(2));
				$('.intens_carrinho').text(" "+total_produtos+" ");
			}else{
				var conf = window.confirm("Este produto já foi adicionado ao carrinho, deseja adicionar novamente?");
				if(conf === true){
					$('<li id="clone-'+cod+'" style="display:none;"></li>').html(ui.draggable.html()).prependTo( this );
					$(this).find('li:first').slideDown();
					var total_produtos = $(this).find('li').length;
				
					var at = $("#total").val();
					var total = (parseFloat(at)+ parseFloat(price));
					$("#total").val(total);		
					$('#carrinho-info').html('<p>' + total_produtos + ' produto' + ( total_produtos > 1 ? 's' : '' ) + '</p>Total: <span class="total">'+total.toFixed(2)+'</span>' );
					$('.total-amount').text(total.toFixed(2));
					$('.intens_carrinho').text(" "+total_produtos+" ");
				}else{
					alert('O produto não foi adicionado');
				}
			}				
		}	
	});
	

	$('#carrinho-container').mouseenter(function(){
		clearTimeout( timerCarrinho );
	});	
	$('#shopping-cart').hover(function(){
		clearTimeout( timerCarrinho );
	});
	$('#carrinho-container').mouseleave(function(){
		var carrinho = $(this);
		timerCarrinho = setTimeout( function(){
			$(carrinho).slideUp();			
		}, 5000 );
	});	
	$('#shopping-cart').mouseleave(function(){
		var carrinho = $(this);		
		timerCarrinho = setTimeout( function(){
			$(carrinho).slideUp();			
		}, 3000 );
	});	
	$('#finish').click(function(){
		$("#dialog").dialog( "open" );
		return false;
	});	
	$( "#dialog" ).dialog({
	      autoOpen: false,
	      modal: true,
	      buttons: {
		      "Continuar comprando": function() {
		        $(this).dialog( "close" );
		      }
		  },
	      show: {
	        effect: "blind",
	        duration: 1000
	      },
	      hide: {
	        effect: "explode",
	        duration: 1000
	      }
    });
});