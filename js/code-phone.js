$('#phone').on('keyup', function() {
				var str = $('#phone').val();
				var value = str.indexOf("095", 3);
        console.log(value);
        if(str.length > 4){
        	if(str[4] != 9 && str[4] != 6 && str[4] != 5 && str[4] != 7){
          console.log('worning!')
          str = str.slice(0, -1)
          console.log(str)
          $('#phone').val(str);
          }else{
          if(str.length > 5){
          		switch(str[4]){
              	case '9':{
                	if(str[5] == 0 || str[5] == 1 || str[5] == 2 || str[5] == 4){
                  	str = str.slice(0, -1)
         						$('#phone').val(str);
                  }
              		break;
                }
                case '7':{
                	if(str[5] != 3){
                  	str = str.slice(0, -1)
         						$('#phone').val(str);
                    
                  }
                  break;
                }
                case '6':{
                	if(str[5] != 3 && str[5] != 6 && str[5] != 7 && str[5] != 8){
                  	str = str.slice(0, -1)
         						$('#phone').val(str);
                    
                  }
                  break;
                }
                case '5':{
                	if(str[5] != 0){
                  	str = str.slice(0, -1)
         						$('#phone').val(str);
                  }
                  break;
                }
              }   
              }
          }
        }
       
});
