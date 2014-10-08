GameScene = pc.Scene.extend( 'GameScene',
	{ },
	{
		gameplayLayer : null,
		playerScore : null,
		opponentScore : null,
		
		init : function( )
		{
			this._super( );
			
            this.gameplayLayer = this.addLayer(
				new GameplayLayer( 'Gameplay', 10000, 10000 )
			);
			
			this.playerScore = pc.Entity.create( this.gameplayLayer );
			this.playerScore.addComponent( pc.components.Text.create( { color : '#FFFFFF', fontHeight : pc.device.canvas.height * 0.1, text : [ '0' ] } ) );
			this.playerScore.addComponent( pc.components.Spatial.create( { x : pc.device.canvas.width * 0.25, y : pc.device.canvas.height * 0.1 } ) );
			
			this.opponentScore = pc.Entity.create( this.gameplayLayer );
			this.opponentScore.addComponent( pc.components.Text.create( { color : '#FFFFFF', fontHeight : pc.device.canvas.height * 0.1, text : [ '0' ] } ) );
			this.opponentScore.addComponent( pc.components.Spatial.create( { x : pc.device.canvas.width * 0.75, y : pc.device.canvas.height * 0.1 } ) );
			
			pc.device.input.bindState( this, 'MOVE_UP', 'UP' );
			pc.device.input.bindState( this, 'MOVE_DOWN', 'DOWN' );
		},
		
		process : function( )
		{
			// Handle Input
			if( pc.device.input.isInputState( this, 'MOVE_UP' ) )
			{
				this.gameplayLayer.player.moveUp( );
			}
			else if( pc.device.input.isInputState( this, 'MOVE_DOWN' ) )
			{
				this.gameplayLayer.player.moveDown( );
			}
			
			// Handle Ball
			this.gameplayLayer.ball.spatial.pos.y -= 1;
			this.gameplayLayer.ball.spatial.pos.x += 2;
			
			// Handle AI
			if( this.gameplayLayer.ball.spatial.pos.y < this.gameplayLayer.opponent.spatial.pos.y )
			{
				this.gameplayLayer.opponent.moveUp( );
			}
			else
			{
				this.gameplayLayer.opponent.moveDown( );
			}
			
			pc.device.ctx.clearRect( 0, 0, pc.device.canvas.width, pc.device.canvas.height );
			
			this._super( );
		}
	}
);