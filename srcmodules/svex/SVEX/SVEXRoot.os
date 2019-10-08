package SVEX

/**
 *  This is a good place to put documentation about your OSpace.
 */
public object SVEXRoot

	public		Object	Globals = SVEX::SVEXGlobals



	/**
	 *  Content Server Startup Code
	 */
	public function Void Startup()
		
			//
			// Initialize globals object
			//
		
			Object	globals = $SVEX = .Globals.Initialize()
		
			//
			// Initialize objects with __Init methods
			//
		
			$Kernel.OSpaceUtils.InitObjects( globals.f__InitObjs )
		
		end

end
