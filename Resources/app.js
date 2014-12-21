//Majura Maheswaran's Kinetic Cafe Coding Challenge

//create base UI tab and root window
var mainWin = Titanium.UI.createWindow({  
	theme:"Theme.AppCompat.Translucent.NoTitleBar.Fullscreen",
    backgroundColor:'#fff',
    layout:'vertical'
});


//label displaying title
var titleLabel = Titanium.UI.createLabel({
	color:'#999',
	top:'5%',
	text:"Majura Maheswaran's\nCode Challenge",
	font:{fontSize:'20%',fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});


//button for retrieving contact list
var retrieveBtn = Titanium.UI.createButton({
	width:'45%',
	height:75,
	top:'25%',
	color:'#FFF',		
	style: 'none',
	title:'Retrieve Contacts',
	font:{fontSize:'12%', fontWeight : 'bold'},
});	
	

//on click event listener for retrieveBtn
retrieveBtn.addEventListener('click', function() {	
	retrieve_contact_list();	
}); 	



//add controls to main window	
mainWin.add(titleLabel);
mainWin.add(retrieveBtn);

//open main window
mainWin.open();



//functions
//function for making first letter of word capital
function capitlize(string)
{
	var capitalizedWord = string.charAt(0).toUpperCase() + string.slice(1);
	return capitalizedWord;
};


//function for opening window and displaying contacts in a table view
function open_contact_list_window(object)
{
	var win_list = Ti.UI.createWindow({
		theme:"Theme.AppCompat.Translucent.NoTitleBar.Fullscreen",
        backgroundColor:'transparent',
        width:'100%',
        height:'100%'
	 });
    
    var slideLeft = Ti.UI.createAnimation();
	    slideLeft.left = 0;
	    slideLeft.duration = 300;
 
    var slideRight = Ti.UI.createAnimation();
	    slideRight.right = -320;
	    slideRight.duration = 300;
 	
 	
 	//code for bevel view 
	var topShade = Ti.UI.createView({
		backgroundGradient: {
	        type: 'linear',
	        startPoint: { x: '50%', y: '0%' },
	        endPoint: { x: '50%', y: '100%' },
	        colors: [ { color: '#D8D8D8', offset: 0.25}, { color: '#D8D8D8', offset: 0.25 }, { color: '#E6E6E6', offset: 0.5 } ],
	    },
	    top:'0%',
	   	width:'100%',
	    height:'10%'
	});
	
	var titleBarLabel = Ti.UI.createLabel({
		text:'Contact List',
		color:'#000',
		height:'auto',
		width:'auto',
		font:{fontSize:'14%', fontWeight:'bold'},
		left:'5%'
	});
	
	topShade.add(titleBarLabel);
	
	
 	//main view
	var categoryView = Ti.UI.createView({
	    //backgroundImage: '/acessories/images/tableBackground.png',
	    backgroundColor:'blue',
		height:'60%',
		width:'70%',							
		borderRadius:4,
		borderColor:'#FFF',
		borderWidth:3,
		opacity:0,	    
		curve:Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT,
	   	zIndex:1
		//layout:'vertical'
	});
 	
 	
 	
 	var data = [];
	
	//function for adding information to each row in table
	function addRow(idx,text)
	{
		data[idx].add(Ti.UI.createLabel({
			text:text,
			color:'#FFF',
			height:'auto',
			width:'auto',
			font:{fontSize:'11%', fontWeight:'bold'},
			left:'40%'
		}));
		
		
		data[idx].add(Titanium.UI.createImageView({
			image:retrieve_picture(object[idx].user.picture.thumbnail),
			width:'20%',
			height:'75%',
			left:'5%'
		}));
		
		data[idx].add(Ti.UI.createView({
		    backgroundColor:'#FFF',
			height:1,
			width:'100%',							
			bottom:0
		}));
	};
	
	//alert(object[0].user.name.first);	
	var nameList = [];
	
	for (var i=0; i < object.length; i++) {
	   nameList[i] = capitlize(object[i].user.name.title) + '.' + capitlize(object[i].user.name.first) + ' ' + capitlize(object[i].user.name.last);
	   data[i] = Ti.UI.createTableViewRow({height:'auto', test:nameList[i]});
	   addRow(i, nameList[i]);
	};
	
	
	//alert(nameList[0]);
	
	
	
	// create table view
	var tableview = Titanium.UI.createTableView({
		data:data,
		minRowHeight:70,
		top: '10%'
	});
	
	//this a label at the bottom of the window, in which will tell user to "lick on contact" for an action
	var actionLabel = Titanium.UI.createLabel({
		color:'#999',
		bottom:'5%',
		text:"Click On Contact To View Profile",
		font:{fontSize:'15%',fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto',
		opacity:1,	    
		curve:Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
	});

	//create table view event listener
	tableview.addEventListener('click', function(e)
	{
		// event data
		var index = e.index;
		
		if(e.rowData.test == nameList[index])
		{
			//alert(index);
			open_contact_info_window(object, index, nameList[index], actionLabel);
		}
	});
 	 	
 	
    
    categoryView.add(topShade);   
 	categoryView.add(tableview); 
 	win_list.add(categoryView);	
 	win_list.add(actionLabel);	
 	
    win_list.open(slideLeft);
	
	setTimeout(function(e)
	{
		categoryView.animate({opacity:1, duration:650});
	},250);
	
};







//Function for opening contacts information
function open_contact_info_window(object, index, name, actionLabel)
{
	var win = Ti.UI.createWindow({
		theme:"Theme.AppCompat.Translucent.NoTitleBar.Fullscreen",
        backgroundColor:'transparent',
        width:'100%',
        height:'100%'
	 });
    
    var slideLeft = Ti.UI.createAnimation();
	    slideLeft.left = 0;
	    slideLeft.duration = 300;
 
    var slideRight = Ti.UI.createAnimation();
	    slideRight.right = -320;
	    slideRight.duration = 300;
 	
 	
 	// code for bevel view 
	var topShade = Ti.UI.createView({
		backgroundGradient: {
	        type: 'linear',
	        startPoint: { x: '50%', y: '0%' },
	        endPoint: { x: '50%', y: '100%' },
	        colors: [ { color: '#D8D8D8', offset: 0.25}, { color: '#D8D8D8', offset: 0.25 }, { color: '#E6E6E6', offset: 0.5 } ],
	    },
	    top:'0%',
	   	width:'100%',
	    height:'10%'
	});
	
	var titleBarLabel = Ti.UI.createLabel({
		text:name,
		color:'#000',
		height:'auto',
		width:'auto',
		font:{fontSize:'14%', fontWeight:'bold'},
		left:'5%'
	});
	
	topShade.add(titleBarLabel);
	
	
 	//main view 
	var mainView = Ti.UI.createView({
	    backgroundColor:'blue',
		height:'70%',
		width:'80%',							
		borderRadius:4,
		borderColor:'#FFF',
		borderWidth:3,
		opacity:0,	    
		curve:Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
 	
 	
 	//iformation view 
	var infoView = Ti.UI.createView({
	    backgroundColor:'transparent',
		height:'90%',
		width:'100%',	
		top:'10%',						
		layout:'vertical'
	});
 	
 	
 	//contact image
 	var contactImage = Titanium.UI.createImageView({
		image:retrieve_picture(object[index].user.picture.medium),
		width:60,
		height:75,
		top:'5%'
	});
 	
 	
 	//contact information labels
 	//Function for ceating labels
 	function createLabel(title, text)
	{
		var label = Ti.UI.createLabel({
			text:title + text,
			color:'#FFF',
			height:'auto',
			width:'auto',
			font:{fontSize:'12%', fontWeight:'bold'},
			top:'2%',
			left:'5%'
		});
		
		infoView.add(label);
	};
	
	//Function for ceating labels
 	function callContact(title, text)
	{
		var view = Ti.UI.createView({
		    backgroundColor:'transparent',
			height:30,
			width:'100%',	
			top:'2%'
		});
	
		var label = Ti.UI.createLabel({
			text:title + text,
			color:'#FFF',
			height:'auto',
			width:'auto',
			font:{fontSize:'12%', fontWeight:'bold'},
			left:'5%'
		});
		
		//call contact button
		var callBtn = Titanium.UI.createButton({
			width:50,
			height:'100%',
			color:'#FFF',		
			style: 'none',
			title:'Call',
			right:'10%',
			font:{fontSize:'12%', fontWeight : 'bold'},
		});	
			
		
		//on click event listener for callBtn
		callBtn.addEventListener('click', function() {	
			Ti.Platform.openURL('tel://1' + text);	
		});

		view.add(label);
		view.add(callBtn);
		infoView.add(view);
	};
	
	//function for converting date
	function convertDate(date)
	{
		return new Date(parseInt(date.replace('/Date(', '')));
 	};
 	
	var address = capitlize(object[index].user.location.street) +',\n' + capitlize(object[index].user.location.city) + ', ' + capitlize(object[index].user.location.state) + ', ' + object[index].user.location.zip;
	
	infoView.add(contactImage);
	
	//add labels
	createLabel('Email: ', object[index].user.email);
	createLabel('Address:\n', address);
 	createLabel('UserName: ', object[index].user.username);
 	createLabel('Date Of Birth: ', convertDate(object[index].user.dob));
 	createLabel('SSN: ', object[index].user.SSN);
 	createLabel('Registered On: ', convertDate(object[index].user.registered));
 	
 	callContact('Phone#: ', object[index].user.phone);
 	callContact('Mobile#: ', object[index].user.cell);
 	
 	var close = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'/asset/images/close_btn.png');
		
	var closeImageView = Titanium.UI.createImageView({
		image:close,
		right:'2%',
		width:'10%',
		height:'60%'
	});
 	
 	closeImageView.addEventListener('click', function(){
        win.close(slideRight);
        actionLabel.animate({opacity:1, duration:650});
    });
    
 	
    topShade.add(closeImageView);
    mainView.add(topShade); 
    mainView.add(infoView);
 	win.add(mainView);	
 	
 	
    win.open(slideLeft);
	
	setTimeout(function(e)
	{
		mainView.animate({opacity:1, duration:650});
		actionLabel.animate({opacity:0, duration:650});
	},250);
	
};










//funttion for calling the APIs

//API for getting contact list
function retrieve_contact_list()
{	
	var url = 'http://api.randomuser.me/0.4.1/?results=25';
	var xhr = Titanium.Network.createHTTPClient();
 	var jsonObject = [];
 	 
		xhr.onload = function(e) 
		{
			try
			{
				jsonObject = JSON.parse(this.responseText).results;
				//alert(jsonObject[0].user.name.title);	
				
				open_contact_list_window(jsonObject);										
			}
			catch(e)
			{
				alert("I'm Here Catch");
				//alert('Error: "Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you."');
			}
		};
		
		xhr.onerror = function(e)
		{
			//Ti.UI.createAlertDialog({title:'XHR', message:'Error: ' + e.error}).show();
			//alert("I'm Here Error");
			alert('Error: "Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you."');
		};
		
		
		// Issuing a GET request to the remote URL
		xhr.open('GET', url);
		xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');
		xhr.send();
};






//API for retrieving user's picture
function retrieve_picture(url)
{	
	var filename = url.split('/');
		filename = filename[filename.length - 1];								
		// Try and get the file that has been previously cached
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
		
		if (file.exists()) {
			// If it has been cached, assign the local asset path to the image view object.
			//imageViewObject.image = file.nativePath;
			//alert("File Downloaded!");
			
			return file.nativePath;
		} 
		
		else 
		{
			// If it hasn't been cached, grab the directory it will be stored in.
			
	 
			// Create the HTTP client to download the asset.
			var xhr = Titanium.Network.createHTTPClient();
	 
			xhr.onload = function(e) 
			{
				
				
				if (xhr.status == 200) {
					// On successful load, take that image file we tried to grab before and 
					// save the remote image data to it.
					//alert("Done");										
					file.write(xhr.responseData);
					// Assign the local asset path to the image view object.
					//imageViewObject.image = file.nativePath;
				};
			};
			
			
			xhr.onerror = function(e)
			{
				file.write('');
			};
			
			
			// Issuing a GET request to the remote URL
			xhr.open('GET', url);
			//Finally, sending the request out.
			xhr.setRequestHeader('Content-Type','application/json; charset=utf-8');
			xhr.send();
			
			return file.nativePath;		
		}
};
