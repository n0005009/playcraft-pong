Ball = pc.Base.extend( 'Ball',
	{ },
	{
		entity : null,
		physics : null,
		spatial : null,
		sprite : null,
		
		init : function( layer )
		{
			this._super( layer );
			
			this.entity = pc.Entity.create( layer );
			this.entity.addTag( 'BALL' );
			
			//this.sprite = this.entity.addComponent( pc.components.Circle.create( {
			//	color : '#FFFFFF'
			//} ) );
			
			this.spatial = this.entity.addComponent( pc.components.Spatial.create( {
				dir : Math.random( ) * 360,
				x : pc.device.canvas.width * 0.50 - pc.device.canvas.width * 0.02 / 2,
				y : pc.device.canvas.height * 0.50 - pc.device.canvas.width * 0.02 / 2,
				w : pc.device.canvas.width * 0.02,
				h : pc.device.canvas.width * 0.02,
			} ) );
			
			this.physics = this.entity.addComponent( pc.components.Physics.create( {
				angularDamping : 0,
				bounce : 1,
				collisionCategory : CollisionType.BALL,
				collisionMask : CollisionType.GOAL | CollisionType.PADDLE | CollisionType.WALL,
				linearDamping : 0,
				mass : 1,
				sensorOnly : true,
				shapes : [
					{ shape : pc.CollisionShape.CIRCLE }
				]
			} ) );
			
			if( pc.device.queryString( 'debug' ) )
			{
				this.spatial.dir = 0;
			}
			
			//this.physics.applyImpulse( 3, 45 );
			this.physics.applyImpulse( 2, 0 );
		}
	}
);