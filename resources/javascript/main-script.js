/******************************************************************************/
/********************************* VARIABLES **********************************/
/******************************************************************************/

	var color = 'black';	//couleur par défaut
	var lineWidth = 2;		//épaisseur par défaut
	var mode =				//mode par défaut
	{
		pencilDrawing: true,
		brushDrawing: false,
		formDrawing: 
		{
			fullFormDrawing: false,
			lineDrawing: false,
			circleDrawing: false,
			squareDrawing: false,
			starDrawing: false
		}
	};
	var drawingOn = false;	//pas de tracé en cours par défaut
	var lineCount = 0;		//pas de ligne en cours de traçage
	var squareCount = 0;	//pas de carré en cours de traçage

	//initialisation de la variable des coordonnées
	var coordinates =
	{
		start : {},
		end : {}
	};

/******************************************************************************/
/********************************* FONCTIONS **********************************/
/******************************************************************************/

	/***************************[ MODES DE DESSIN ]****************************/

	//pinceau
	function brushMode() {
		mode =
		{
			pencilDrawing: false,
			brushDrawing: true,
			formDrawing: 
			{
				fullFormDrawing: false,
				lineDrawing: false,
				circleDrawing: false,
				squareDrawing: false,
				starDrawing: false
			}
		};
	}

	//crayon
	function pencilMode() {
		mode =
		{
			pencilDrawing: true,
			brushDrawing: false,
			formDrawing: 
			{
				fullFormDrawing: false,
				lineDrawing: false,
				circleDrawing: false,
				squareDrawing: false,
				starDrawing: false
			}
		};
	}

	/* ---------- Formes ---------- */

	//ligne
	function formLineMode() {
		mode =
		{
			pencilDrawing: false,
			brushDrawing: false,
			formDrawing: 
			{
				fullFormDrawing: false,
				lineDrawing: true,
				circleDrawing: false,
				squareDrawing: false,
				starDrawing: false
			}
		};
	}

	//cercle
	function formCircleMode() {
		mode =
		{
			pencilDrawing: false,
			brushDrawing: false,
			formDrawing: 
			{
				fullFormDrawing: false,
				lineDrawing: false,
				circleDrawing: true,
				squareDrawing: false,
				starDrawing: false
			}
		};
	}

	//cercle plein
	function formCircleFullMode() {
		mode =
		{
			pencilDrawing: false,
			brushDrawing: false,
			formDrawing: 
			{
				fullFormDrawing: true,
				lineDrawing: false,
				circleDrawing: true,
				squareDrawing: false,
				starDrawing: false
			}
		};
	}

	//carré
	function formSquareMode() {
		mode =
		{
			pencilDrawing: false,
			brushDrawing: false,
			formDrawing: 
			{
				fullFormDrawing: false,
				lineDrawing: false,
				circleDrawing: false,
				squareDrawing: true,
				starDrawing: false
			}
		};
	}

	//carré plein
	function formSquareFullMode() {
		mode =
		{
			pencilDrawing: false,
			brushDrawing: false,
			formDrawing: 
			{
				fullFormDrawing: true,
				lineDrawing: false,
				circleDrawing: false,
				squareDrawing: true,
				starDrawing: false
			}
		};
	}

	//étoile
	function formStarMode() {
		mode =
		{
			pencilDrawing: false,
			brushDrawing: false,
			formDrawing: 
			{
				fullFormDrawing: false,
				lineDrawing: false,
				circleDrawing: false,
				squareDrawing: false,
				starDrawing: true
			}
		};
	}

	//étoile pleine
	function formStarFullMode() {
		mode =
		{
			pencilDrawing: false,
			brushDrawing: false,
			formDrawing: 
			{
				fullFormDrawing: true,
				lineDrawing: false,
				circleDrawing: false,
				squareDrawing: false,
				starDrawing: true
			}
		};
	}

	/***************************[ AFFICHAGE ]****************************/

	/* ---------- Affichage de la couleur en cours ---------- */

	function colorPreview() {
			//récupération de la case "aperçu" à colorier et remplissage avec la couleur en cours
	    	$preview = $('#preview');	
			var previewCtx = $preview[0].getContext("2d");
		    previewCtx.fillStyle = color;
		    previewCtx.fillRect(0, 0, 30.000, 30.000);
		};

	/* ---------- Affichage/masquage de la palette ---------- */

	//Note : le bouton est actuellement désactivé.
	function showPalette() {
		if ($palette.css('display') == 'none')
		{
			$palette.fadeIn();
		}
		else
		{
			$palette.fadeOut();
		}
	}

	/* ---------- Création du dégradé de la palette ---------- */

	function createPaletteGradient() {
		//récupération de la palette où appliquer le dégradé
		$palette = $('#palette');
		ctx = $palette[0].getContext("2d");

		//création du dégradé horizontal
	    var grd = ctx.createLinearGradient(0.000, 150.000, 300.000, 150.000);
	      
	    grd.addColorStop(0.000, 'rgba(255, 0, 0, 1.000)');
	    grd.addColorStop(0.150, 'rgba(255, 0, 255, 1.000)');
	    grd.addColorStop(0.330, 'rgba(0, 0, 255, 1.000)');
	    grd.addColorStop(0.490, 'rgba(0, 255, 255, 1.000)');
	    grd.addColorStop(0.670, 'rgba(0, 255, 0, 1.000)');
	    grd.addColorStop(0.840, 'rgba(255, 255, 0, 1.000)');
	    grd.addColorStop(1.000, 'rgba(255, 0, 0, 1.000)');
	      
	    //remplissage avec le 1er dégradé
	    ctx.fillStyle = grd;
	    ctx.fillRect(0, 0, 300.000, 300.000);

	    //création du dégradé vertical
	    var grd = ctx.createLinearGradient(150.000, 0.000, 150.000, 300.000);
	      
	    grd.addColorStop(0.000, 'rgba(255, 255, 255, 1.000)');
	    grd.addColorStop(0.500, 'rgba(128, 128, 128, 0)');
	    grd.addColorStop(1.000, 'rgba(0, 0, 0, 1.000)');
	      
	    //remplissage avec le 2ème dégradé
	    ctx.fillStyle = grd;
	    ctx.fillRect(0, 0, 300.000, 300.000);
	}

	/***************************[ FONCTIONNALITES ]****************************/

	/* ---------- Couleurs personnalisées ---------- */

	function favoriteColorClick(event) {
		//récupération de la case sélectionnée
		$favorite = $(this);
		var favoriteCtx = $favorite[0].getContext("2d");

		//si la couleur de la case n'a pas encore été définie
		if (!$favorite.hasClass("defined"))
		{
			//remplissage de la case avec la couleur en cours
	    	favoriteCtx.fillStyle = color;
	    	favoriteCtx.fillRect(0, 0, 30.000, 30.000);
			$favorite.addClass("defined");	//ajout du statut "défini"
		}
		else 	//si la couleur de la case a déjà été définie
		{
			//récupération de la position du clic
			var favoriteOffset = $favorite.offset();
			var favoriteX = Math.floor(event.pageX - favoriteOffset.left);
			var favoriteY = Math.floor(event.pageY - favoriteOffset.top);
			//récupération des infos de couleur à cette position
			var imageData = favoriteCtx.getImageData(favoriteX, favoriteY, 1, 1);
			var pixel = imageData.data;
			//utilisation de la couleur de la case comme couleur en cours
			color = 'rgba('+pixel[0]+','+pixel[1]+','+pixel[2]+','+pixel[3]+')';
			colorPreview();	//mise à jour de l'affichage de la couleur en cours
		}
	}

	function eraseFavoriteColor(event) {
		//récupération de la case à vider
		favNumber = $(this).data('color');
		favId = '#color'+favNumber;
		$favorite = $(favId);
		
		//si la couleur de la case a déjà été définie
		if ($favorite.hasClass("defined"))
		{
			//récupération du canvas de la case
			var favoriteCtx = $favorite[0].getContext("2d");
			//remplissage de la case en blanc
	    	favoriteCtx.fillStyle = 'white';
	    	favoriteCtx.fillRect(0, 0, 30.000, 30.000);
	    	//suppression du statut "défini"
			$favorite.removeClass("defined");
		}
	}


	/* ---------- Remplissage de la toile ---------- */

	function fillCanvas(event) {
		//remplissage de toute la toile avec la couleur en cours
		context.fillStyle = color;
		context.fillRect(0,0,canvasWidth,canvasHeight);
	}


	/* ---------- Nouvelle toile ---------- */

	function clearCanvas() {
		//suppression des tracés de la toile
		context.clearRect(0, 0, canvasWidth, canvasHeight);
	}


	/* ---------- Epaisseur du trait et taille des formes ---------- */

	function setLineWidth() {
		lineWidth = $(this).attr('data-size');	//choix d'une épaisseur prédéfinie
		$range.val(lineWidth);	//mise à jour de l'affichage sur la réglette
	}

	function getLineWidth() {
		lineWidth = $range.val();	//définition de l'épaisseur via la réglette
	}

	function getFormWidth() {
		formWidth = $formRange.val();	//définition de la taille des formes via la réglette
	}


	/* ---------- Sélection de la couleur ---------- */

	//couleurs prédéfinies
	function chooseColor() {
		//récupération de la couleur du bouton
		color = $(this).attr('data-color');
		colorPreview();	//mise à jour de l'affichage de la couleur en cours
	}

	//couleurs de la palette
	function pickColor(event) {
		//récupération de la position au clic
		var paletteOffset = $palette.offset();
		var paletteX = Math.floor(event.pageX - paletteOffset.left);
		var paletteY = Math.floor(event.pageY - paletteOffset.top);
		//récupération des infos de couleur à cette position
		var imageData = ctx.getImageData(paletteX, paletteY, 1, 1);
		var pixel = imageData.data;
		//utilisation de la couleur sélectionnée comme couleur en cours
		color = 'rgba('+pixel[0]+','+pixel[1]+','+pixel[2]+','+pixel[3]+')';
		colorPreview();	//mise à jour de l'affichage de la couleur en cours
	}

	//blanc ("gomme")
	function eraserWhite() {
		color = 'white';
		colorPreview();	//mise à jour de l'affichage de la couleur en cours
	}

	/***************************[ TRACéS ]****************************/

	/* ---------- Fonctions communes ---------- */

	//définition des coordonnées de début du tracé
	function setStartCoordinates(event) {
		coordinates.start.x = event.offsetX;
		coordinates.start.y = event.offsetY;
	}

	//définition des coordonnées de fin du tracé
	function setEndCoordinates(event) {
		coordinates.end.x = event.offsetX;
		coordinates.end.y = event.offsetY;
	}

	//définir un chemin entre les coordonnées de début et de fin
	function linkPoints() {
		context.beginPath();
		context.moveTo(coordinates.start.x, coordinates.start.y);
		context.lineTo(coordinates.end.x, coordinates.end.y);
		context.closePath();
	}

	//définir un cercle aux coordonnées de début de largeur "width"
	function circlePath(width){
		context.beginPath();
		context.arc(coordinates.start.x,coordinates.start.y,width,0,Math.PI*2,true);
		context.closePath();
	}

	//contour avec la couleur en cours
	function strokeContext() {
		context.lineWidth = lineWidth;
		context.strokeStyle = color;
		context.stroke();
	}

	//remplissage avec la couleur en cours
	function fillContext() {
		context.lineWidth = lineWidth;
		context.fillStyle = color;
		context.fill();
	}

	function fillOrStroke() {
		//si le mode est en dessin plein
		if (mode.formDrawing.fullFormDrawing)
		{
			fillContext();	//remplissage
		}
		else 
		{
			strokeContext();	//sinon, contour
		}
	}

	/* ---------- Crayon ---------- */

	function drawPencilLine(event) {
		//relier le point précédent au point actuel
		setEndCoordinates(event);
		linkPoints();
		strokeContext();
		//définir les coordonnées actuelles comme début du prochain tracé
		setStartCoordinates(event);
	}

	/* ---------- Pinceau ---------- */

	//Note : la précision du rendu dépend des performances.
	function drawBrushLine(event) {
		//créer un cercle plein (largeur = épaisseur du trait)
		circlePath(lineWidth);
		fillContext();
		//définir les coordonnées actuelles comme celles pour le prochain cercle
		setStartCoordinates(event);
	}

	/* ---------- Formes ---------- */

	//ligne
	function drawLine(event) {
		if (lineCount == 0)	//si aucun point n'a encore été défini
		{
			setStartCoordinates(event);	//enregistrer les coordonnées actuelles comme début de la ligne
			lineCount = 1;
		}
		else	//si le premier point est défini
		{
			setEndCoordinates(event);	//enregistrer les coordonnées actuelles comme fin de la ligne
			linkPoints();	//relier le début et la fin de la ligne
			strokeContext();
			lineCount = 0;
		}
	}

	//cercle
	function drawCircle(event) {
		setStartCoordinates(event);	//enregistrer les coordonnées actuelles pour placer la forme
		circlePath(formWidth);	//créer un cercle (largeur = taille des formes)
		fillOrStroke();	//remplissage ou contour selon le mode
	}

	//carré
	function drawSquare(event) {
		if (squareCount == 0)	//si le premier angle n'a pas encore été défini
		{
			setStartCoordinates(event);	//enregistrer les coordonnées actuelles comme premier angle
			squareCount = 1;
		}
		else	//si le premier angle a déjà été défini
		{
			setEndCoordinates(event);	//enregistrer les coordonnées actuelles comme angle opposé
			context.beginPath();
			context.moveTo(coordinates.start.x, coordinates.start.y);	//premier angle
			context.lineTo(coordinates.start.x, coordinates.end.y);
			context.lineTo(coordinates.end.x, coordinates.end.y);		//angle opposé
			context.lineTo(coordinates.end.x, coordinates.start.y);
			context.closePath();
			fillOrStroke();	//remplissage ou contour selon le mode
			squareCount = 0;
		}
	}

	// étoile - *** fonction originale : https://jsfiddle.net/baivong/ujnckxoa/ ***
	function drawStar(event) {
		var spikes = 5;					//nombre de pointes
		var outerRadius = formWidth;	//rayon extérieur
		var innerRadius = formWidth/2;	//rayon intérieur
	    var rot=Math.PI/2*3;
	    var step=Math.PI/spikes;

	    //position de l'étoile
	    var x=event.offsetX;	
	    var y=event.offsetY;
	    
	    //tracé de l'étoile
	    context.beginPath();
	    context.moveTo(event.offsetX,event.offsetY-outerRadius)
	    for(i=0;i<spikes;i++){
	    	x=event.offsetX+Math.cos(rot)*outerRadius;
	    	y=event.offsetY+Math.sin(rot)*outerRadius;
	    	context.lineTo(x,y);
	    	rot+=step;

	    	x=event.offsetX+Math.cos(rot)*innerRadius;
	    	y=event.offsetY+Math.sin(rot)*innerRadius;
	    	context.lineTo(x,y);
	    	rot+=step;
	    }
	    context.lineTo(event.offsetX,event.offsetY-outerRadius);
	    context.closePath();

	    fillOrStroke();	//remplissage ou contour selon le mode
	}



/******************************************************************************/
/******************************* CODE PRINCIPAL *******************************/
/******************************************************************************/

$(function()	//au chargement du DOM
{
	//récupération des éléments HTML
	$canvas = $('#picture');
	$range = $('#range');
	$formRange = $('#formRange');
	$picker = $('#tool-color-picker');
	formWidth = $formRange.val();
	canvasWidth = parseInt($canvas.css('width'));
	canvasHeight = parseInt($canvas.css('height'));
	context = $canvas[0].getContext('2d');

	//création du dégradé de la palette
	createPaletteGradient();

	/* ---------- gestionnaires d'événements : association des fonctions aux boutons correspondants ---------- */
	
	//outils
	$('#tool-bucket').on('click', fillCanvas);
	$('#tool-brush').on('click', brushMode);
	$('#tool-pencil').on('click', pencilMode);
	$('#tool-eraser').on('click', eraserWhite);

	//formes
	$('#tool-line').on('click', formLineMode);
	$('#tool-circle').on('click', formCircleMode);
	$('#tool-circle-full').on('click', formCircleFullMode);
	$('#tool-square').on('click', formSquareMode);
	$('#tool-square-full').on('click', formSquareFullMode);
	$('#tool-star').on('click', formStarMode);
	$('#tool-star-full').on('click', formStarFullMode);

	//taille des formes
	$formRange.on('mouseup', getFormWidth);

	//couleur
	$('.pen-color').on('click', chooseColor);

	//couleurs personnalisées
	$('.favorite-color').on('click', favoriteColorClick);
	$('.erase-favorite-color').on('click', eraseFavoriteColor);

	//épaisseur du trait
	$('.pen-size').on('click', setLineWidth);
	$range.on('mouseup', getLineWidth);

	//nouvelle toile
	$('#tool-clear-canvas').on('click', clearCanvas);

	//bouton affichage de la palette (désactivé)
	$picker.on('click', showPalette);

	//sélection via la palette
    $palette.on('click', pickColor);


    /* ---------- gestionnaires d'événements : souris et canvas ---------- */
	
	//souris enfoncée
	$canvas.on('mousedown', function(event)
	{
		drawingOn = true;	//tracé en cours
		if(mode.brushDrawing || mode.pencilDrawing)
		{
			setStartCoordinates(event);
		}
		else if (mode.formDrawing)
		{
			if (mode.formDrawing.lineDrawing)
			{
				drawLine(event);
			}
			else if(mode.formDrawing.circleDrawing)
			{
				drawCircle(event);
			}
			else if(mode.formDrawing.squareDrawing)
			{
				drawSquare(event);
			}
			else if (mode.formDrawing.starDrawing)
			{
				drawStar(event);
			}	
		}
	});

	//souris relevée
	$canvas.on('mouseup', function(event)
	{
		drawingOn = false;	//fin du tracé
	});

	//déplacement de la souris
	$canvas.on('mousemove', function(event)
	{
		if(mode.pencilDrawing && drawingOn)
		{
			drawPencilLine(event);
		}

		else if(mode.brushDrawing && drawingOn)
		{
			drawBrushLine(event);
		}
	});
});