var names = ['Edmond Espana', 'Arthur Asbury', 'Jeffery Jacquemin', 'Lazaro Leite', 'Perry Siegfried', 'Rex Gatton', 'Weldon Sproull', 'Randy Hill', 'Dirk Gillie', 'Loyd Dilbeck', 'Noah Zimmermann', 'Jospeh Zepp', 'Hector Boldt', 'Deangelo Havis', 'Winfred Erbe', 'Bruno Dudgeon', 'Stephan Rosenbalm','Manual Bulger','Grant Cipolla', 'Theron Frederickson', 'Rigoberto Rutz', 'Tobias Willer', 'Willard Gerald', 'Wilfredo Martin', 'Kent Sheckler', 'Carson Vanderhoff', 'Lanny Dunson', 'Alvin Angles', 'Mose Trieu', 'Hal Shellhammer', 'Mike Puett', 'Pedro Stenzel', 'Jeffery Halford', 'Brice Salvas', 'Lorenzo Sass', 'Otha Deibler', 'Kyle Poch', 'Barton Trautman','Alvaro Shulman','Gary Custer', 'Pierre Luebbert', 'Andrea Borgia', 'Blaine Barhorst', 'Al Maurer', 'Deandre Abalos', 'Jesse Kinkade', 'Emmett Soden', 'Jordon Cousar', 'Elroy Reddix', 'Moises Parrott', 'Barry Mickelsen', 'Alton Dail', 'Bennie Sepeda','Katlyn Engelhardt', 'Mandi Beiler', 'Zoe Simpkins','Mavis Keever', 'Jeanetta Badger', 'Lila Roles', 'Lorie Monica', 'Pamala Swofford', 'Laila Mingle', 'Charleen Lilley', 'Evia Dill', 'Gisele Quon', 'Cathie Ashworth', 'Ronna Kuhlman', 'Leilani Nunez', 'Tammera Danz'];
var dates = ['07/28/2017', '07/22/2017', '07//25/2017', '07/23/2017', '07/24/2017', '07/26/2017', '07/27/2017', '08/1/2017', '07/29/2017', '07/30/2017', '07/31/2017'];
var images =  ['3d-preview1.png', '3d-preview2.jpg', '3d-preview3.jpeg'];
var wos = ['68496', '69204', '77202', '96020', '18424', '75920', '81639', '91826', '77192', '11293', '88462', '77192', '18394', '51929', '82940', '43213', '47292', '22164', '84732', '36475', '92391', '73645', '56321', '84723', '97845', '66644', '88877', '11123', '98564', '34323', '68294', '69320', '54323', '59432', '60503', '59392', '69439'];
var fabmo = new FabMoDashboard();
var jobId= 0;
var currentJob;

$( document ).ready(function() {
    var width = $(window).width();
    if(width < 700) {
        $('.is-512x512').removeClass('is-512x512').addClass('is-256x256');
    } else {
        $('.is-256x256').removeClass('is-256x256').addClass('is-512x512');
    }
    $('.main-card').css('left', width);
});

$( window ).resize(function() {

    var width = $(window).width();
    if(width < 700) {
        $('.is-512x512').removeClass('is-512x512').addClass('is-256x256');
    } else {
        $('.is-256x256').removeClass('is-256x256').addClass('is-512x512');
    }
    $('.main-card').css('left', width);
});

$('body').on('click', '.job', function(e){
    if ($(event.target).attr('class')=== 'delete'){
        $(this).remove();
    } else {
        $('.main-card').css('left', '0');

        var name = $(this).find('.job-name').html();
        var date = $(this).find('.job-date').html();
        var wo = $(this).find('.job-wo').html();
        $('.wo').html(wo);
        $('.name').html(name);
        $('.date').html(date);
        $('.main-card').attr('id', 'job'+$(this).attr('id'));
        
    }
});

$('.remove-card').click(function(){
    var width = $(window).width();
    $('.main-card').css('left', width);
});

$('.run-file').click(function(){
    var string = $(this).parents('.main-card').attr('id');
   var id = string.replace(/^job+/i, '');
   currentJob = id;
    $('#'+id+' .card').css("background-color", "#0ab23d");
     $('.remove-card').click();
    runFile();
});

setInterval(function(){
     if ($('.job').length <= 5){
        var name =  getRandom(names);
        var date =  getRandom(dates);
        var image =  getRandom(images);
        var wo = getRandom(wos);
        makeJob(name, date, image, wo);
     }
}, 3000);


makeJob = function (name, date, image, wo){
    jobId++;
    var html = '<li id ="'+jobId+'"class="job"><div class="card is-mobile"><div class="card-content"><div class="media"><div class="media-left"><figure class="image is-48x48"><img src="images/'+image+'" alt="Image"></figure></div><div class="media-content"><div class="level is-mobile"><div class="level-item has-text-centered"><div><p class="heading">Work Order#</p><p class="job-wo">'+wo+'</p></div></div><div class="level-item has-text-centered"><div><p class="heading">File Name</p><p class="">Demonstration Cabinet</p></div></div><div class="level-item has-text-centered"><div><p class="heading">Customer</p><p class="job-name">'+name+'</p></div></div><div class="level-item has-text-centered"><div><p class="heading">Due Date</p><p class="job-date">'+date+'</p></div></div></div></div><div class="media-right"><button class="delete"></button></div></div></div></div></li>';
    $('.job-list').append(html);
}

getRandom = function(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

runFile = function(){
    var sbp = "";
    var jobPath = 'jobs/AWFS_1.sbp';
  
  jQuery.get(jobPath, function(data) {
      sbp += data;
    })
    .done(function() {
    jobPath = jobPath.replace('jobs/', '');
    jobPath = jobPath.replace('.sbp', '');
    fabmo.clearJobQueue(function(err,data){
        if (err){
          cosole.log(err);
        } else {
          fabmo.submitJob({
            file: sbp,
            filename: 'Demonstration Cabinet' + '.sbp',
            name: "Demonstration Cabinet",
            description: "Demonstration cut for AWFS 2017"
          }, {stayHere : true}, function(err, result) {
            if (err){
              console.info(err);
            } else {
              fabmo.runNext(function(err, data) {
                if (err) {
                  console.info(err);
                } else {
                  console.info('running');
                 

                }
              });
            }
          });
        }
    });
    })
}

 fabmo.on("job_end", function(data) {
    $('#'+currentJob).remove();
 });