package SVEX

public object SVEXGlobals inherits KERNEL::Globals

	override	List	f__InitObjs = { \
											SVEX::SVEXWebModule, \
											SVEX::CSUIExtension, \
											SVEX::SVEXRequestHandlerGroup \
										}

end
