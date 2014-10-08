CollisionType =
{
	NONE :   0x0000, // BIT MASK
	BALL :   0x0001, // 0000001
	GOAL :   0x0002, // 0000010
	PADDLE : 0x0004, // 0000100
	WALL :   0x0008  // 0001000
};

GameplayPhysics = pc.systems.Physics.extend( 'GameplayPhysics',
	{ },
	{
		onCollision : function( aType, bType, entityA, entityB, force, fixtureAType, fixtureBType, contact )
		{
		},
		
		onCollisionStart : function( aType, bType, entityA, entityB, fixtureAType, fixtureBType, contact )
		{
			if( aType == pc.BodyType.ENTITY && bType == pc.BodyType.ENTITY )
			{
				if( entityB.hasTag( 'BALL' ) && entityA.hasTag( 'PADDLE' ) )
				{
					var ballPhysics = entityA.getComponent( 'physics' );
					var paddlePhysics = entityB.getComponent( 'physics' );
					
					paddlePhysics.setCollisionMask( CollisionType.WALL );
					ballPhysics.setCollisionMask( CollisionType.GOAL | CollisionType.WALL );
					
					ballPhysics.setLinearVelocity( -ballPhysics.getLinearVelocity( ).x, ballPhysics.getLinearVelocity( ).y );
					paddlePhysics.setLinearVelocity( 0, paddlePhysics.getLinearVelocity( ).y );
					
					//ballPhysics.getLinearVelocity( ).add( 5, 5 );
				}
				else if( entityB.hasTag( 'BALL' ) && entityA.hasTag( 'WALL' ) )
				{
					var ballPhysics = entityA.getComponent( 'physics' );
					
					ballPhysics.setLinearVelocity( ballPhysics.getLinearVelocity( ).x, -ballPhysics.getLinearVelocity( ).y );
				}
			}
		},
		
		onCollisionEnd : function( aType, bType, entityA, entityB, fixtureAType, fixtureBType, contact )
		{
			var gameplayScene = pc.device.game.getFirstActiveScene( ).object( );
			
			if( entityB.hasTag( 'BALL' ) )
			{
				if( entityA.hasTag( 'PADDLE' ) )
				{
					entityA.getComponent( 'physics' ).setCollisionMask( CollisionType.BALL | CollisionType.WALL );
				}
				else if( entityA.hasTag( 'OPPONENT_GOAL' ) )
				{
					gameplayScene.opponentScore++;
					gameplayScene.gameplayLayer.resetBall( );
				}
				else if( entityA.hasTag( 'PLAYER_GOAL' ) )
				{
					gameplayScene.playerScore++;
					gameplayScene.gameplayLayer.resetBall( );
				}
			}
		}
	}
);

GameplayLayer = pc.EntityLayer.extend( 'GameplayLayer',
	{ },
	{
		ball : null,
		opponent : null,
		player : null,
		
		init : function( layerId, worldSizeX, worldSizeY )
		{
			this._super( layerId, worldSizeX, worldSizeY );
			
			this.addSystem( new GameplayPhysics( { debug : true } ) );
			this.addSystem( new pc.systems.Render( ) );
			
			this.ball = new Ball( this );	
			this.opponent = new Opponent( this );
			this.player = new Player( this );
			
			this.createWall( this, 0, -33, pc.device.canvas.width, 33 );
			this.createWall( this, 0, pc.device.canvas.height, pc.device.canvas.width, 33 );
			
			this.createGoal( this, this.player, pc.device.canvas.width, 0, 33, pc.device.canvas.height );
			this.createGoal( this, this.opponent, -33, 0, 33, pc.device.canvas.height );
			
			// Player Input
			pc.device.input.bindState( this, 'P1_MOVE_DOWN', 'DOWN' );
			pc.device.input.bindState( this, 'P1_MOVE_UP', 'UP' );
		},
		
		process : function( )
		{
			this.handleInput( );
			
			if( !this.scene.multiplayer )
			{
				this.handleAI( );
			}
			
			this._super( );
		},
		
		draw : function( )
		{
			this._super( );
			
			this.opponent.draw( );
			this.player.draw( );
		},
		
		createGoal : function( layer, paddle, x, y, w, h )
		{
			var goal = pc.Entity.create( layer );
			
			if( paddle === this.player )
			{
				goal.addTag( 'PLAYER_GOAL' );
			}
			else
			{
				goal.addTag( 'OPPONENT_GOAL' );
			}
			
			goal.addComponent( pc.components.Spatial.create( {
				dir : 0,
				x : x,
				y : y,
				w : w,
				h : h
			} ) );
			
			goal.addComponent( pc.components.Physics.create( {
				collisionCategory : CollisionType.GOAL,
				collisionMask : CollisionType.BALL,
				immovable : true,
				sensorOnly : true,
				shapes : [ { shape : pc.CollisionShape.RECT } ]
			} ) );
		},
		
		createWall : function( layer, x, y, w, h )
		{
			var wall = pc.Entity.create( layer );
			
			wall.addTag( 'WALL' );
			
			wall.addComponent( pc.components.Spatial.create( {
				x : x,
				y : y,
				dir : 0,
				w : w,
				h : h
			} ) );
			
			wall.addComponent( pc.components.Physics.create( {
				collisionCategory : CollisionType.WALL,
				collisionMask : CollisionType.BALL | CollisionType.PADDLE,
				friction : 0,
				immovable : true,
				shapes : [ { shape : pc.CollisionShape.RECT } ]
			} ) );
		},
		
		handleAI : function( )
		{
			if( this.ball.physics.getLinearVelocity( ).x > 0 )
			{
				if( this.ball.spatial.pos.y > this.opponent.spatial.pos.y + this.opponent.spatial.dim.y / 2 )
				{
					this.opponent.moveDown( );
				}
				else if( this.ball.spatial.pos.y < this.opponent.spatial.pos.y + this.opponent.spatial.dim.y / 2 )
				{
					this.opponent.moveUp( );
				}
			}
		},
		
		handleInput : function( )
		{
			if( pc.device.input.isInputState( this, 'P1_MOVE_DOWN' ) )
			{
				this.player.moveDown( );
			}
			else if( pc.device.input.isInputState( this, 'P1_MOVE_UP' ) )
			{
				this.player.moveUp( );
			}
			
			if( this.scene.multiplayer )
			{
				if( pc.device.input.isInputState( this, 'P2_MOVE_DOWN' ) )
				{
					this.opponent.moveDown( );
				}
				else if( pc.device.input.isInputState( this, 'P2_MOVE_UP' ) )
				{
					this.opponent.moveUp( );
				}
			}
		},
		
		resetBall : function( )
		{
			this.ball = new Ball( this );
		}
	}
);