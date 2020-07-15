$(document).ready(function(){

        var alldata = [], max_con = 0, max_act = 0, max_rec = 0, max_dec = 0, states_id = [];

         $.getJSON('https://api.covid19india.org/data.json', function (Data) {

    
             for(var i=0;i<Data.statewise.length;i++){

                alldata[String(Data.statewise[i].statecode)] = [  Number(Data.statewise[i].confirmed),

                                                                  Number(Data.statewise[i].active),

                                                                  Number(Data.statewise[i].recovered),

                                                                  Number(Data.statewise[i].deaths),

                                                                  Data.statewise[i].state

                                                               ];

             if(max_con < Number(Data.statewise[i].confirmed) && i)
                 max_con = Number(Data.statewise[i].confirmed);

             if(max_act < Number(Data.statewise[i].active) && i)
                 max_act = Number(Data.statewise[i].active);

             if(max_rec < Number(Data.statewise[i].recovered) && i)
                 max_rec = Number(Data.statewise[i].recovered);

             if(max_dec < Number(Data.statewise[i].deaths) && i)
                 max_dec = Number(Data.statewise[i].deaths);
                
                }

                             $('path').each(function(){
                              if(this.id != "")
                                states_id.push(this.id);
                             });



                       function genrate_section(maximum,code){

                            var ratio =Math.ceil(maximum/10);

                            for(i=0; i<states_id.length; i++){

                            if(states_id[i] in alldata){

                                $('#'+states_id[i]).removeAttr('class');

                                if(alldata[states_id[i]][code-1] < ratio)
                                    $('#'+states_id[i]).addClass('section0'+code);

                                else if(alldata[states_id[i]][code-1]<(ratio*2))
                                    $('#'+states_id[i]).addClass('section1'+code);

                                else if(alldata[states_id[i]][code-1]<(ratio*3))
                                    $('#'+states_id[i]).addClass('section2'+code);
                              
                                else if(alldata[states_id[i]][code-1]<(ratio*4))
                                    $('#'+states_id[i]).addClass('section3'+code);
                            
                                else if(alldata[states_id[i]][code-1]<(ratio*5))
                                    $('#'+states_id[i]).addClass('section4'+code);

                                else if(alldata[states_id[i]][code-1]<(ratio*6))
                                    $('#'+states_id[i]).addClass('section5'+code);
                                
                                else if(alldata[states_id[i]][code-1]<(ratio*7))
                                    $('#'+states_id[i]).addClass('section6'+code);
                            
                                else if(alldata[states_id[i]][code-1]<(ratio*8))
                                    $('#'+states_id[i]).addClass('section7'+code);
                        
                                else if(alldata[states_id[i]][code-1]<(ratio*9))
                                    $('#'+states_id[i]).addClass('section8'+code);
                                
                                else
                                    $('#'+states_id[i]).addClass('section9'+code);


                            //sec11 21 31 41 51 sec12 22 32 42 52 sec13 23 33 43 53 sec14 24 34 45 54
                            }
                              
                        } 

                    }

                    genrate_section(max_con,1);

                    $('#conf_box').click(function(){
                        genrate_section(max_con,1);
                    });

                    $('#actv_box').click(function(){
                        genrate_section(max_act,2);
                    });

                    $('#recv_box').click(function(){
                        genrate_section(max_rec,3);
                    });

                    $('#deac_box').click(function(){
                        genrate_section(max_dec,4);
                    });

                    
                     $("path, circle").hover(function(){
                        if($(this).attr('id')){
                            $(this).addClass('stkhover');
                            
                            $('#conf').text(alldata[$(this).attr('id')][0]);

                            $('#actv').text(alldata[$(this).attr('id')][1]);

                            $('#recv').text(alldata[$(this).attr('id')][2]);

                            $('#deac').text(alldata[$(this).attr('id')][3]);
                            
                            $('#info-box').html(alldata[$(this).attr('id')][4]);

                        }

                     });
                     

                        function display_box(){
                      
                             $('#conf').text(alldata['TT'][0]);

                             $('#actv').text(alldata['TT'][1]);

                             $('#recv').text(alldata['TT'][2]);

                             $('#deac').text(alldata['TT'][3]);

                         }

                         display_box();

                         $("path, circle").mouseleave(function() {

                            display_box();
                            $(this).removeClass('stkhover');
                            $('#info-box').text('India');

                        });

        });

});