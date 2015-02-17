/**
 * Created by tonyjiang on 15/2/10.
 */
define([
    'jquery',
    'modules/_WidgetBase',
    'modules/Util',

    'dataTable'
    //'text!./templates/nav.html'
] , function($ , _WidgetBase , Util){

    var dataSet = [
        ['Trident','Internet Explorer 4.0','Win 95+','4','X'],
        ['Trident','Internet Explorer 5.0','Win 95+','5','C'],
        ['Trident','Internet Explorer 5.5','Win 95+','5.5','A'],
        ['Trident','Internet Explorer 6','Win 98+','6','A'],
        ['Trident','Internet Explorer 7','Win XP SP2+','7','A'],
        ['Trident','AOL browser (AOL desktop)','Win XP','6','A']
    ];

    var Table = function(){
        this.templates = '<table cellpadding="0" cellspacing="0" border="0" class="data-table" id="data-table"></table>';

        this.widget = null;

        this.init = function(params){

            this.inherited(arguments);
            this._initTable();
            this._initEvents();

        };

        this._initTable = function(){
            this.widgetJQ = $('#data-table');
            this.widget = $('#data-table').DataTable({
                "data" : dataSet,
                "columns": [
                    { "title": "Engine" },
                    { "title": "Browser" },
                    { "title": "Platform" },
                    { "title": "Version", "class": "center" },
                    { "title": "Grade", "class": "center" }
                ]
            });
        };

        this._initEvents = function(){
            this.widgetJQ.delegate('tr' , 'click' , Util.hitch(this , function(e){
                $(this.widgetJQ).find('.row-selected').removeClass('row-selected');
                $(e.currentTarget).addClass('row-selected');
                var data = this.widget.row(e.currentTarget).data();
                this.emit('rowSelect' , {row : e.currentTarget , data : data});
            }));
        };

        this.clear = function(){
            return this.widget.clear();
        };

        this.add = function(){
           this.widget.rows.add.apply(this.widget.row , arguments);
            return this;
        };

        this.redraw = function(){
            this.widget.draw();
            return this;
        };

    };
    Table = Table.extend(_WidgetBase);
    return Table;
});