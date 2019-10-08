package SVEX

public object SVEXWebModule inherits WEBDSP::WebModule

	override	List	fDependencies = { { 'kernel', 16, 0 }, { 'restapi', 16, 0 } }
	override	Boolean	fEnabled = TRUE
	override	String	fModuleName = 'svex'
	override	String	fName = 'SVEX'
	override	List	fOSpaces = { 'svex' }
	override	String	fSetUpQueryString = 'func=svex.configure&module=svex&nextUrl=%1'
	override	List	fVersion = { '1', '0', 'r', '0' }

end
