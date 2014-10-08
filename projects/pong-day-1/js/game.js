GameScene = pc.Scene.extend('GameScene',
	{ },
	{
		gameLayer : null,
		ball : null,
		player : null,
		opponent : null,
		playerScore : null,
		opponentScore : null,
		
		init : function( )
		{
			this._super( );
			
            this.gameLayer = this.addLayer( new pc.EntityLayer( 'game layer', 10000, 10000 ) );
			
			this.gameLayer.addSystem( new pc.systems.Render( ) );
			
			this.ball = pc.Entity.create( this.gameLayer );
			this.ball.addComponent( pc.components.Circle.create( { color : '#FFFFFF' } ) );
			this.ball.addComponent( pc.components.Spatial.create( { x : pc.device.canvas.width / 2 - 8, y : pc.device.canvas.height / 2 - 8, w : 15, h : 15 } ) );
			
			this.player = pc.Entity.create( this.gameLayer );
			this.player.addComponent( pc.components.Rect.create( { color : '#FFFFFF' } ) );
			this.player.addComponent( pc.components.Spatial.create( { x : pc.device.canvas.width * 0.1, y : pc.device.canvas.height / 2 - 50, w : 15, h : 100 } ) );
			
			this.opponent = pc.Entity.create( this.gameLayer );
			this.opponent.addComponent( pc.components.Rect.create( { color : '#FFFFFF' } ) );
			this.opponent.addComponent( pc.components.Spatial.create( { x : pc.device.canvas.width * 0.9 - 15, y : pc.device.canvas.height / 2 - 50, w : 15, h : 100 } ) );
			
			this.playerScore = pc.Entity.create( this.gameLayer );
			this.playerScore.addComponent( pc.components.Text.create( { color : '#FFFFFF', fontHeight : pc.device.canvas.height * 0.1, text : [ '0' ] } ) );
			this.playerScore.addComponent( pc.components.Spatial.create( { x : pc.device.canvas.width * 0.25, y : pc.device.canvas.height * 0.1 } ) );
			
			this.opponentScore = pc.Entity.create( this.gameLayer );
			this.opponentScore.addComponent( pc.components.Text.create( { color : '#FFFFFF', fontHeight : pc.device.canvas.height * 0.1, text : [ '0' ] } ) );
			this.opponentScore.addComponent( pc.components.Spatial.create( { x : pc.device.canvas.width * 0.75, y : pc.device.canvas.height * 0.1 } ) );
			
			pc.device.input.bindAction( this, 'move', 'UP' );
		},
		
		onAction : function( actionName, event, pos )
		{
			if( actionName === 'move' )
				this.box.getComponent( 'spatial' ).pos.x += 10;
		},
		
		process : function( )
		{
			pc.device.ctx.clearRect( 0, 0, pc.device.canvas.width, pc.device.canvas.height );
			
			this._super( );
		}
	}
);

Pong = pc.Game.extend( 'Pong',
	{ },
	{
		gameScene : null,
		
		onReady : function( )
		{
			this._super( );
			
			if( pc.device.devMode )
				pc.device.loader.setDisableCache( );
			
			this.gameScene = new GameScene( );
			this.addScene( this.gameScene );
		},
		
		onLoading : function( percentageComplete )
		{
		},
		
		onLoaded : function( )
		{
			this.gameScene = new GameScene( );
			this.addScene( this.gameScene );
		}
	}
);