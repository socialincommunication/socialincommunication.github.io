tell application "Microsoft PowerPoint"
	launch
	delay 3
	set pptxPath to "/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/PRESENTAZIONE_ESTETOLOGIA_SCENOGRAFICA_FINALE.pptx"
	set pdfPath to "/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/PRESENTAZIONE_ESTETOLOGIA_SCENOGRAFICA_FINALE.pdf"
	
	-- Open presentation
	set targetFile to pptxPath as POSIX file
	set openPres to open targetFile
	delay 3
	
	-- Export to PDF
	set pdfFile to pdfPath as POSIX file
	save openPres in pdfFile as save as PDF
	delay 3
	
	-- Close and clean up
	close openPres saving no
	quit
end tell
