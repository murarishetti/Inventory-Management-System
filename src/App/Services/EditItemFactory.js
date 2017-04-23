/**
 * Created by daras on 27-Mar-17.
 */
(function () {

    var EditItemFactory=function () {

        var factory = {};

        var Data = {
            SearchTerm:null,
            Items:null
        }
        var Item;

        factory.setSelectedItem = function (item) {
            Item = item;

        }

        factory.getSelectedItem = function () {
            return Item
        }


        factory.setData = function (SearchValue,Result) {
            Data.SearchTerm = SearchValue;
            Data.Items = Result
        }

        factory.getData = function () {
            return Data;
        }
        return factory;
    }
    EditItemFactory.$inject=['$location']
    angular.module('SplitWise').factory("EditItemFactory",EditItemFactory)

}())