//Loads when page is ready
$(document).ready( function ()
{
	$('#cat').hide();
    $("#uploadForm").submit( function(submitEvent) 
    {
        // get the file name, possibly with path (depends on browser)
        var filename = $("#inputVideo").val();

        // Use a regular expression to trim everything before final dot
        var extension = filename.replace(/^.*\./, '');

        // If there is no dot anywhere in filename, we would have extension == filename, so we account for this possibility now
        if (extension == filename) 
        {
            extension = '';
        } 
        else 
        {
            // if there is an extension, we convert to lower case
            // (N.B. this conversion will not effect the value of the extension
            extension = extension.toLowerCase();
        }

        switch (extension) 
        {
        	
            case 'avi':
            case 'mov':
            case 'mp4':
            //console.log("Hello World");
            //$(body).append("<img id='cat' src='pics/cat.gif' ");
            $('#cat').show();
            return true;

            // Breaks out of the switch statement if one if the above cases is true.
	        break;

            default:
                // Cancel the form submission and alerts the user
                alert("You can only load videos with a \".avi\", \".mp4\", or a \".mov\" extension.");
                submitEvent.preventDefault();
        }
    });
});