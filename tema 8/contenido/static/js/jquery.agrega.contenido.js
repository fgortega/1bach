/*
* jQuery Agrega contenido plug-in 0.1
*
*	@autor Pablo Lasso
*/

(function($){

$.fn.contenido = function(contenidoSettings){

	var settings = $.extend({
			ancho_menu: 430,
			inicio_menu_desplegado:'true',
			boton_menu:'#enlace_menu',
			contenedor_menu:'#panel_menu',
			contenedor_frame:'#contenido',
			contenido_min_alto: 450,
			contenido_min_ancho: 545,
			flechas: 2
	}, contenidoSettings);

	var contenido= $(this);
	var anchoMenu= settings.ancho_menu;
	var anchoOffset= 35;
	var altoOffset = 150;
	var anchoFlechas = 20 * settings.flechas;
	var altoMinimo= settings.contenido_min_alto;
	var anchoMinimo= settings.contenido_min_ancho - anchoFlechas ;
	
	if( $.browser.msie && (jQuery.browser.version == 6) )
	{
		altoOffset= 200;
	}
	if(window.opera )
	{
		altoOffset= 220;
	}
	
	
	var panel_menu= $(settings.contenedor_menu);
	var frame_contenido=$(settings.contenedor_frame);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	contenido.bind("redimensionar", function(data){
		
		dimensions= getDimensions();
		if((dimensions.height - altoOffset) < altoMinimo)
			alto=altoMinimo;
		else
			alto=dimensions.height - altoOffset;

		if(frame_contenido)
		{
			$(settings.contenedor_frame).css('height',alto);
		}

		dimensions= getDimensions();
		if((dimensions.width - anchoMenu - anchoOffset - anchoFlechas) < anchoMinimo)
			ancho=anchoMinimo;
		else
			ancho= dimensions.width - anchoMenu - anchoOffset - anchoFlechas; 

		if(frame_contenido)
		{
			$(settings.contenedor_frame).css('width',ancho);
		}

		if(anchoMenu > 0)
		{
			panel_menu.css('display','block');
		}
		
		return true;
	})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	*
	*/
	var menuButton = $(settings.boton_menu);
	menuButton.click(function()
	{
			
		if(panel_menu.css('display')=='none')
		{
			anchoMenu=settings.ancho_menu;
			panel_menu.show();
		}else
		{
			anchoMenu=0;
			panel_menu.css('display','none');
		}
		
		contenido.trigger('redimensionar');
		return false;
    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	/**
	*	funcion privada que permite obtener las dimensiones del browser en cada momento.
	*
	*/
	function getDimensions()
	{
		dimensions = {width: 0, height: 0};
		dimensions.width = $(window).width();
		dimensions.height = $(window).height();
		return dimensions;
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(settings.inicio_menu_desplegado=='false')
	{
		menuButton.click();
	}
	contenido.trigger('redimensionar');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	return $(this);
};


})(jQuery);