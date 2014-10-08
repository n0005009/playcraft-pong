GameplayScene = pc.Scene.extend( 'GameplayScene',
	{ },
	{
		multiplayer : false,
		
		gameplayLayer : null,
		hudLayer : null,
		
		opponentScore : 0,
		playerScore : 0,
		
		init : function( )
		{
			this._super( );
			
			this.gameplayLayer = this.addLayer( new GameplayLayer( 'Gameplay Layer', pc.device.canvas.width, pc.device.canvas.height ) );
			this.hudLayer = this.addLayer( new HUDLayer( 'HUD Layer', pc.device.canvas.width, pc.device.canvas.height ) );
		},
		
		process : function( )
		{
			pc.device.ctx.clearRect( 0, 0, pc.device.canvasWidth, pc.device.canvasHeight );
			this._super( );
		},
		
		enableMultiplayer : function( )
		{
			pc.device.input.clearStates( this.gameplayLayer );
			pc.device.input.bindState( this.gameplayLayer, 'P1_MOVE_DOWN', 'Z' );
			pc.device.input.bindState( this.gameplayLayer, 'P1_MOVE_UP', 'A' );
			pc.device.input.bindState( this.gameplayLayer, 'P2_MOVE_DOWN', 'DOWN' );
			pc.device.input.bindState( this.gameplayLayer, 'P2_MOVE_UP', 'UP' );
			this.multiplayer = true;
		},
	}
);