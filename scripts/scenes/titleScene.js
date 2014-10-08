TitleScene = pc.Scene.extend( 'TitleScene',
	{ },
	{
		instruction : null,
		title : null,
		
		init : function( )
		{
			this._super( );
			
			var sceneLayer = this.addLayer( new pc.EntityLayer( 'Entity Layer', 10000, 10000 ) );
			sceneLayer.addSystem( new pc.systems.Render( ) );
			
			this.title = pc.Entity.create( sceneLayer );
			this.title.addComponent(
				pc.components.Text.create( {
					color : '#FFFFFF',
					font : 'Montserrat',
					fontHeight: pc.device.canvas.height * 0.15,
					text : [ 'PONG CLONE' ],
				} )
			);
			
			pc.device.ctx.font = this.title.getComponent( 'text' ).fontHeight + 'px ' + this.title.getComponent( 'text' ).font;
			this.title.addComponent(
				pc.components.Spatial.create( {
					dir : 0,
					x : pc.device.canvasWidth * 0.50 - pc.device.ctx.measureText( this.title.getComponent( 'text' ).text[0] ).width / 2,
					y : pc.device.canvas.height * 0.50
				} )
			);
			
			this.instruction = pc.Entity.create( sceneLayer );
			this.instruction.addComponent(
				pc.components.Text.create( {
					color : '#FFFFFF',
					font : 'Montserrat',
					text : [
						'1 for Single Player',
						' 2 for Multiplayer'
					]
				} )
			);
			
			pc.device.ctx.font = this.instruction.getComponent( 'text' ).fontHeight + 'px ' + this.instruction.getComponent( 'text' ).font;
			this.instruction.addComponent(
				pc.components.Spatial.create( {
					dir : 0,
					x : pc.device.canvasWidth * 0.50 - pc.device.ctx.measureText( this.instruction.getComponent( 'text' ).text[0] ).width / 2,
					y : pc.device.canvasHeight * 0.80
				} )
			);
			
			pc.device.input.bindAction( this, 'SINGLE_PLAYER', '1' );
			pc.device.input.bindAction( this, 'MULTIPLAYER', '2' );
		},
		
		onAction : function( actionName, event, pos )
		{
			var game = pc.device.game;
			
			if( actionName === 'SINGLE_PLAYER' )
			{
				game.gameplayScene = new GameplayScene( );
				game.addScene( game.gameplayScene );
				game.deactivateScene( game.titleScene );
			}
			else if( actionName === 'MULTIPLAYER' )
			{
				game.gameplayScene = new GameplayScene( );
				game.gameplayScene.enableMultiplayer( );
				game.addScene( game.gameplayScene );
				game.deactivateScene( game.titleScene );
			}
		},
		
		process : function( )
		{
			pc.device.ctx.clearRect( 0, 0, pc.device.canvasWidth, pc.device.canvasHeight );
			this._super( );
		}
	}
);