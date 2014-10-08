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
				if( entityA.hasTag( 'BALL' ) && entityB.hasTag( 'PADDLE' ) )
				{
					var ballPhysics = entityA.getComponent( 'physics' );
					var paddlePhysics = entityB.getComponent( 'physics' );
					
					paddlePhysics.setCollisionMask( CollisionType.WALL );
					paddlePhysics.setLinearVelocity( 0, paddlePhysics.getLinearVelocity( ).y );

					ballPhysics.setLinearVelocity( -ballPhysics.getLinearVelocity( ).x * 1.25, ballPhysics.getLinearVelocity( ).y );
				}
				else if( entityA.hasTag( 'BALL' ) && entityB.hasTag( 'WALL' ) )
				{
					var ballPhysics = entityA.getComponent( 'physics' );
					
					ballPhysics.setLinearVelocity( ballPhysics.getLinearVelocity( ).x, -ballPhysics.getLinearVelocity( ).y );
				}
			}
		},
		
		onCollisionEnd : function( aType, bType, entityA, entityB, fixtureAType, fixtureBType, contact )
		{
			if( entityA.hasTag( 'BALL' ) )
			{
				var gameplayScene = pc.device.game.getFirstActiveScene( ).object( );
			
				if( entityB.hasTag( 'PADDLE' ) )
				{
					entityB.getComponent( 'physics' ).setCollisionMask( CollisionType.BALL | CollisionType.WALL );
				}
				else if( entityB.hasTag( 'OPPONENT_GOAL' ) )
				{
					var opponentScore = parseInt( gameplayScene.opponentScore.getComponent( 'text' ).text[ 0 ] );
					gameplayScene.opponentScore.getComponent( 'text' ).text[ 0 ] = opponentScore + 1;
					gameplayScene.gameplayLayer.ball = new Ball( gameplayScene.gameplayLayer );
				}
				else if( entityB.hasTag( 'PLAYER_GOAL' ) )
				{
					var playerScore = parseInt( gameplayScene.playerScore.getComponent( 'text' ).text[ 0 ] );
					gameplayScene.playerScore.getComponent( 'text' ).text[ 0 ] = playerScore + 1;
					gameplayScene.gameplayLayer.ball = new Ball( gameplayScene.gameplayLayer  );
				}
			}
		}
	}
);

GameplayLayer = pc.EntityLayer.extend( 'GameplayLayer',
	{ },
	{
		ball : null,
		player : null,
		opponent : null,
		
		init : function( layerId, worldSizeX, worldSizeY )
		{
			this._super( layerId, worldSizeX, worldSizeY );
			
			this.addSystem( new pc.systems.Render( ) );
			this.addSystem( new GameplayPhysics( { debug : true } ) );
			
			this.ball = new Ball( this );
			this.player = new Player( this );
			this.opponent = new Opponent( this );
			
			this.createWall( this, 0, -33, pc.device.canvas.width, 33 );
			this.createWall( this, 0, pc.device.canvas.height, pc.device.canvas.width, 33 );
			
			this.createGoal( this, this.player, pc.device.canvas.width, 0, 33, pc.device.canvas.height );
			this.createGoal( this, this.opponent, -33, 0, 33, pc.device.canvas.height );
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
				x : x,
				y : y,
				w : w,
				h : h
			} ) );
			
			goal.addComponent( pc.components.Physics.create( {
				collisionCategory : CollisionType.GOAL,
				collisionMask : CollisionType.BALL,
				immovable : true,
				sensorOnly : true
			} ) );
		},
		
		createWall : function( layer, x, y, w, h )
		{
			var wall = pc.Entity.create( layer );
			wall.addTag( 'WALL' );
			
			wall.addComponent( pc.components.Spatial.create( {
				x : x,
				y : y,
				w : w,
				h : h
			} ) );
			
			wall.addComponent( pc.components.Physics.create( {
				collisionCategory : CollisionType.WALL,
				collisionMask : CollisionType.BALL | CollisionType.PADDLE,
				immovable : true
			} ) );
		}
	}
);