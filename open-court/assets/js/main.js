jQuery(document).ready(function($) {


    /*======= Skillset *=======*/
    
    $('.level-bar-inner').css('width', '0');
    
    $(window).on('load', function() {

        $('.level-bar-inner').each(function() {
        
            var itemWidth = $(this).data('level');
            
            $(this).animate({
                width: itemWidth
            }, 800);
            
        });

    });
    
    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip();
    
    
    /* jQuery RSS - https://github.com/sdepold/jquery-rss */
    
    $("#rss-feeds").rss(
    
        //Change this to your own rss feeds
        "http://feeds.feedburner.com/TechCrunch/startups",
        
        {
        // how many entries do you want?
        // default: 4
        // valid values: any integer
        limit: 3,
        
        // the effect, which is used to let the entries appear
        // default: 'show'
        // valid values: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
        effect: 'slideFastSynced',
        
        // outer template for the html transformation
        // default: "<ul>{entries}</ul>"
        // valid values: any string
        layoutTemplate: "<div class='item'>{entries}</div>",
        
        // inner template for each entry
        // default: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>'
        // valid values: any string
        entryTemplate: '<h3 class="title"><a href="{url}" target="_blank">{title}</a></h3><div><p>{shortBodyPlain}</p><a class="more-link" href="{url}" target="_blank"><i class="fa fa-external-link"></i>Read more</a></div>'
        
        }
    );
    
  });

/**
* функція для малювання графіка
* загальної статистики по карегоріях розглянутих справ
*/
function commonStatistic () {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawCommonStatistic);

    function drawCommonStatistic() {
        var data = google.visualization.arrayToDataTable([
          ['категорія', 'кількість справ'],
          ['цивільні',     519],
          ['кримінальні',      342],
          ['справи про адміністративні правопорушення',  156]
        ]);
        var options = {
          title: 'Категорії розглянутих справ',
          is3D: true,
          legend:{position:'left'},
          chartArea:{left:5,top:0,width:'80%',height:'100%'}
        };
        var chart = new google.visualization.PieChart(document.getElementById('common-statistic'));
        chart.draw(data, options);
    }
    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawCommonStatistic);
}

/**
* функція для малювання графіків
* статистики по цивільних справах
*/
function civilStatistic () {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawCivilStatistic);

    function drawCivilStatistic() {
        var data = google.visualization.arrayToDataTable([
          ['категорія',                               'кількість справ'],
          ['задоволено позовні вимоги позивача',                    519],
          ['відмовлено у задоволенні позовних вимог позивача',      342]
        ]);
        var options = {
          title: 'задоволено/відмовлено у задоволенні позовних вимог',
          pieHole: 0.9,
          legend:{position:'left'},
          chartArea:{left:0,top:0,width:'50%',height:'50%'}
        };
        var chart = new google.visualization.PieChart(document.getElementById('civil-statistic1'));
        chart.draw(data, options);
    }
    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawCivilStatistic);
}
 



     function drawChart() {
       var data = google.visualization.arrayToDataTable([
         ['CMS', 'Сайты на базе систем управления контентом'],

         ['WordPress',     60.7],

         ['Joomla',     7.4],

         ['Drupal',     5.1],

         ['Blogger',     2.9],

         ['Magento',     2.8],

         ['TYPO3',     1.6],

         ['PrestaShop',     1.3],

         ['Bitrix',     1.2],

         ['vBulletin',     1.0],

         ['OpenCart',     0.9],

       ]);

       var options = {
       title: 'Статистика по кримінальних справах',
            pieHole: 0.9,
         pieSliceTextStyle: {
           color: 'black',
         },
         legend: 'none'
       };
       var chart = new google.visualization.PieChart(document.getElementById('donut_single'));
       chart.draw(data, options);

     }



commonStatistic();
// civilStatistic();