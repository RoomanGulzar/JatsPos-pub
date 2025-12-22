
var datePickerOptions = { format: "d/MM/yyyy", culture: "en-AU" };
var dateTimePickerOptions = { format: "d/MM/yyyy h:mm:ss tt", culture: "en-AU" };

function changeCulture(cul, format) {
    keyPressBeep();
    datePickerOptions.culture = cul;
    datePickerOptions.format = format;
    dateTimePickerOptions.culture = cul;
}
$.validator.addMethod('date',
    function (value, element, params) {
        saleModel_GST
        if (this.optional(element)) {
            return true;
        }

        var ok = true;
        try {
            kendo.parseDate(value, "en-AU");
        }
        catch (err) {
            ok = false;
        }
        return ok;
    });
$.widget('custom.mcautocomplete', $.ui.autocomplete, {
    _create: function () {
        this._super();
        this.widget().menu("option", "items", "> :not(.ui-widget-header)");
    },
    _renderMenu: function (ul, items) {
        var self = this,
            thead;
        if (this.options.showHeader) {
            table = $('<div class="ui-widget-header" style="width:100%;"></div>');
            $.each(this.options.columns, function (index, item) {
                table.append('<span style="padding:0 4px;float:left;width:' + item.width + ';">' + item.name + '</span>');
            });
            table.append('<div style="clear: both;"></div>');
            ul.append(table);
        }
        $.each(items, function (index, item) {
            self._renderItem(ul, item);
        });
    },
    _renderItem: function (ul, item) {
        var t = '',
            result = '';
        $.each(this.options.columns, function (index, column) {
            t += '<span style="padding:0 4px;float:left;width:' + column.width + ';">' + item[column.valueField ? column.valueField : index] + '</span>'
        });
        result = $('<li></li>')
            .data('ui-autocomplete-item', item)
            .append('<a class="mcacAnchor">' + t + '<div style="clear: both;"></div></a>')
            .appendTo(ul);
        return result;
    }
});

function OpeniningClosingScreen() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Pos/OpeningClosingBalance',
        async: true,
        success: function (data) {
            $("#opening_closing_screen").html("");
            $("#opening_closing_screen").html(data);
            switchOpeningClosingScreen(true);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function switchOpeningClosingScreen(showOpClo) {
    keyPressBeep();
    if (showOpClo) {
        $(".not_main_screen").slideUp();
        $("#opening_closing_screen").slideDown();
        $("#main_screen").slideUp();
    } else {
        $("#opening_closing_screen").slideUp();
        $("#main_screen").slideDown();
    }
}

function SalesScreen() {

    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Pos/Sales',
        async: true,
        success: function (data) {
            $("#sales_screen").html("");
            $("#sales_screen").html(data);
            switchSalesScreen(true);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function switchSalesScreen(showSales) {
    keyPressBeep();
    if (showSales) {
        $(".not_main_screen").slideUp();
        $("#sales_screen").slideDown();
        $("#main_screen").slideUp();
    } else {
        $("#sales_screen").slideUp();
        $("#main_screen").slideDown();
    }
}

function RepairOrdersScreen() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Pos/RepairOrders',
        async: true,
        success: function (data) {
            $("#repair_orders_screen").html("");
            $("#repair_orders_screen").html(data);
            switchRepairOrdersScreen(true);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function switchRepairOrdersScreen(showSales) {
    keyPressBeep();
    if (showSales) {
        $(".not_main_screen").slideUp();
        $("#repair_orders_screen").slideDown();
        $("#main_screen").slideUp();
    } else {
        $("#repair_orders_screen").slideUp();
        $("#main_screen").slideDown();
    }
}

function PrintScreen(id) {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Pos/Print?id=' + id,
        async: true,
        success: function (data) {
            $("#print_screen").html("");
            $("#print_screen").html(data);
            switchPrintScreen(true);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function switchPrintScreen(showSales) {
    keyPressBeep();
    if (showSales) {
        $(".not_main_screen").slideUp();
        $("#print_screen").slideDown();
        $("#main_screen").slideUp();
    } else {
        $("#print_screen").slideUp();
        $("#main_screen").slideDown();
    }
}

function NotificationTicker() {
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Pos/NotificationTicker',
        async: true,
        success: function (data) {
            $("#ticker_panel").html("");
            $("#ticker_panel").html(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //handleErrors(textStatus);
        }
    });
}

/****************** Main Content ****************/

function getNewSaleModel() {
    return {
        SaleID: kendo.guid(),
        SaleDate: new Date(),
        pItems: [],
        SubTotal: 0,
        Discount: 0,
        Total: 0
    };
}

function getNextOrderNumber() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Pos/GetNextOrderNumber',
        async: true,
        success: function (data) {
            $("#order_no").html("");
            $("#order_no").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function getCashCounter() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Pos/GetCashCounter',
        async: true,
        success: function (data) {
            $(".cash-counter .total-sales").html("");
            $(".cash-counter .total-sales").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function printCashCounter() {
    if (!confirm("Do you want to print cash counter?")) {
        return false;
    }

    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Pos/GetCashCounterToPrint',
        async: true,
        success: function (data) {
            unblockUI();
            getCashCounterPrint(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });


}

function getTotalSale() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Pos/GetTotalSale',
        async: true,
        success: function (data) {
            $(".total-sale .total-sales").html("");
            $(".total-sale .total-sales").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function refreshPage() {
    saleModel = getNewSaleModel();
    cartData = [];
    currentCartItem = null;
    var cart = $("#cartGrid").data("kendoGrid");
    cart.dataSource.data(cartData);
    updateTotals();
    getNextOrderNumber();
    searchItemInput('clear');
    $("#cash_amount").html(0);
    $("#credit_amount").html(0);
    $("#saleCustomerName").val('').change();
    $("#saleCustomerPhone").val('').change();
    $("#saleCustomerEmail").val('').change();

    $("#taxCustomerTaxNumber").val('').change();
    $("#taxCustomerName").val('').change();
    $("#taxCustomerTaxNumber").val('').change();
    $("#taxCustomerPhone").val('').change();
    $("#taxCustomerAddress").val('').change();
    $("#taxCustomerCardNumber").val('').change();
    $("#taxCustomerNotes").val('').change();


    saleAmountAdded = false;
    serviceChargesAdded = false;
    imeiSNAdded = false;

    //switchBetweenGroupAndPayment(false);
    //getCashCounter();
    //getTotalSale();
}


var saleModel = {
    SaleID: kendo.guid(),
    SaleDate: new Date(),
    CustomerName: "",
    CustomerVat: "",
    pItems: [],
    SubTotal: 0,
    Discount: 0,
    DiscountAmount: 0,
    Total: 0
};

var itemSearchKeypadVal = "";
function searchItemInput(value) {

    if (value === 'clear') {
        showSearchGridContent(false);
        itemSearchKeypadVal = "";
        $("#searchItemQuery").val(itemSearchKeypadVal);
        return;
    } else if (value === 'backspace') {
        itemSearchKeypadVal = itemSearchKeypadVal.substr(0, itemSearchKeypadVal.length - 1);
    } else {
        itemSearchKeypadVal += value;
    }
    $("#searchItemQuery").val(itemSearchKeypadVal);
    itemSearch = itemSearchKeypadVal;
    var searchGrid = $("#searchGrid").data("kendoGrid");
    if (searchGrid) {
        showSearchGridContent(true);
        searchGrid.dataSource.read();
    }
    if (itemSearchKeypadVal === "") {
        showSearchGridContent(false);
    }

}

let debounceTimer;
document.querySelector("#searchItemQuery").addEventListener("keyup", function (e) {
    const ignoredKeys = ["Shift", "Control", "Alt", "Meta", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (ignoredKeys.includes(e.key)) return;

    debouncedSearchQueryChange(this);
});

function debounce(fn, delay) {
    return function (...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => fn.apply(this, args), delay);
    };
}

var searchQueryTimer = 0;
const debouncedSearchQueryChange = debounce(searchQueryChange, 1000);

//// usage
//function onInputChange(e) {
//    debouncedSearchQueryChange(e);
//}
function searchQueryChange(e) {
    itemSearchKeypadVal = e.value;
    itemSearch = e.value;

    if (itemSearch.length === 9) {
        var saleFound = false;
        keyPressBeep();
        blockUI();
        searchQueryTimer = 1000;
        $.ajax({
            type: "GET",
            contentType: "json",
            url: '/Pos/GetSaleByNumber?saleNumber=' + itemSearch,
            async: true,
            success: function (model) {
                searchQueryTimer = 0;
                unblockUI();
                if (!model) {
                    alert("Receipt not found");
                    return;
                }
                saleModel = model;
                saleModel.SaleDate = new Date();
                saleModel.update = true;
                var count = 0;
                var cart = $("#cartGrid").data("kendoGrid");
                cartData = [];
                $.each(model.pItems, function (i, item) {
                    item.Quantity = -item.Quantity;
                    item.Tax = -item.Tax;
                    cartData.push({
                        Id: item.SaleItemID,
                        Lock: true,
                        Index: count + 1,
                        Description: item.Description,
                        FKItemID: item.FKItemID,
                        Qty: item.Quantity,
                        Cost: item.PurchaseCost,
                        Profit: ((item.ProfitLoss / item.Total) * 100).toFixed(2),
                        Price: item.UnitPrice,
                        Total: item.Total
                    });
                });
                updateTotals();
                cart.dataSource.data(cartData);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                searchQueryTimer = 0;
                handleErrors(textStatus);
            }
        });
    }

    if (!saleFound && itemSearch) {
        var searchGrid = $("#searchGrid").data("kendoGrid");
        if (searchGrid) {
            //showSearchGridContent(true);
            searchGrid.dataSource.read();
        }
    } else {
        showSearchGridContent(false);
    }
}
function showSearchGridContent(show) {
    if (show) {
        $("#search-grid-content").slideDown();
    } else {
        $("#search-grid-content").slideUp();
    }
}
var itemSearch = null;

function handleSearchResults(gridData, searchedBarcode) {

    //// ✅ Case 1: If only one item found → add directly to cart
    //if (gridData.length === 1) {
    //    updateCart(cart, gridData[0]);  // your existing function
    //    return;
    //}

    // ✅ Case 2: If searched barcode is same as last search → add directly again
    var cart = $("#cartGrid").data("kendoGrid");
    if (cart) {
        if (itemSearch && itemSearch === searchedBarcode) {
            var match = gridData.find(x => x.ItemNoStr === searchedBarcode);
            if (match) {
                keyPressBeep()
                itemSearch = null
                $("#searchItemQuery").val('').trigger('change')
                showSearchGridContent(false)
                updateCart(cart, match);
            } else if (searchedBarcode) {
                if (gridData.length === 1) {
                    // If only one item is in the grid, add it automatically
                    keyPressBeep();
                    itemSearch = null;
                    $("#searchItemQuery").val('').trigger('change');
                    showSearchGridContent(false);
                    updateCart(cart, gridData[0]);
                } else {
                    showSearchGridContent(true);
                }
            }
            //addToCart(searchedBarcode);
            //itemSearch = null
            //$("#searchItemQuery").val('').trigger('change')
            //showSearchGridContent(false)
            return;
        }
    } else {
        showSearchGridContent(false)
    }

    // ✅ Otherwise → show grid normally
    //var grid = $("#searchGrid").data("kendoGrid");
    //grid.dataSource.data(gridData);

}
//var itemSearch = "";
$("#searchGrid").kendoGrid({
    dataSource: {
        type: "odata",
        transport: {
            read: function (options) {
                searchQueryTimer = 500;
                $.ajax({
                    url: "/Pos/GetSearchItemGridList",
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify({
                        GridFilters: options.data,
                        Search: itemSearch
                    }),
                    success: function (result) {
                        var items = result.Data || [];
                        handleSearchResults(items, itemSearch); // ✅ auto-handle add-to-cart logic
                        options.success(result); // still let kendo know data is ready
                        searchQueryTimer = 0;
                    }
                })
            },
            parameterMap: function (e, type) {
                if (type === "read") return JSON.stringify({
                    GridFilters: e,
                    Search: itemSearch
                })
            }
        },
        schema: {
            data: "Data",
            total: "Total",
            model: {
                id: "ItemID",
                fields: {
                    ItemID: {
                        editable: false
                    }
                }
            }
        },
        serverSorting: true,
    },
    scrollable: true,
    sortable: true,
    selectable: true,
    pageable: false,
    columns: [
        { field: "ItemNoStr", title: "Product #", width: "20%" },
        "Name",
        {
            field: "SalePrice",
            title: "Price",
            //format: "{0:c}",
            width: "20%"
        },
        {
            field: "PurchaseCost",
            title: "Cost",
            //format: "{0:c}",
            width: "10%"
        },
        {
            field: "Profit",
            title: "Profit",
            template: function (o) {
                return (((o.SalePrice - o.PurchaseCost) / o.SalePrice) * 100).toFixed(2) + "%";
            },
            width: "20%"
        },
    ],
    change: function (e) {
        keyPressBeep();
        grid = e.sender;
        currentCartItem = grid.dataItem(this.select());
        var cart = $("#cartGrid").data("kendoGrid");
        if (cart) {
            updateCart(cart, currentCartItem);
            currentCartItem = null;
        }
    }
});


var cartData = [];
var currentCartItem = null;
var deleteCurrentCartItem = null;
$("#cartGrid").kendoGrid({
    dataSource: {
        data: cartData,
        schema: {
            model: {
                fields: {
                    Id: {},
                    Index: { type: "number" },
                    Description: { type: "string" },
                    Qty: { type: "number" },
                    Cost: { type: "number" },
                    Price: { type: "number" },
                    Tax: { type: "number" },
                    Profit: { type: "number" }
                }
            }
        },
        pageSize: 50
    },
    height: "60vh",
    scrollable: true,
    sortable: true,
    selectable: true,
    pageable: false,
    resizable: true,   // allow column resize
    reorderable: false, // allow column reordering
    columnMenu: false,  // let user hide/show columns
    columns: [
        { field: "Index", title: "#", width: "3%" },
        //"Description",
        {
            field: "Description",
            title: "Description",
            width: "60%",
            template: function (dataItem) {
                // show qty in cell
                var value = dataItem.Description;
                // custom tooltip logic
                return '<span title="' + value + '">' + value + '</span>';
            }
        },
        {
            field: "Qty",
            title: "Qty",
            width: "5%",
        },
        {
            field: "Price",
            title: "SP",
            //format: "{0:c}",
            width: "5%"
        },
        {
            field: "Cost",
            title: "CP",
            //format: "{0:c}",
            width: "5%"
        },
        {
            field: "Tax",
            title: "Tax",
            width: "5%"
        },
        {
            field: "Profit",
            title: "P",
            width: "5%"
        },
        {
            field: "Total",
            title: "Total",
            //format: "{0:c}",
            width: "5%"
        }
    ],
    change: function (e) {
        grid = e.sender;

        var selectedItem = grid.dataItem(this.select());

        if (selectedItem && selectedItem.Lock) {
            return;
        }

        var selectedRow = this.select(); // get the selected row element

        keyPressBeep();

        if (currentCartItem) {
            //$(".currentItem_Qty").html(currentCartItem.Qty);
            //itemQtyKeppadVal = "";
            //$("#cartItemPriceInput").val(currentCartItem.Price);
            //itemPriceKeppadVal = "";
            //var win = $("#cartItemActionWindow").data("kendoWindow");
            //win.center().open();

            //setTimeout(function () { $("#cartItemPriceInput").focus(); }, 1000);
            //return;
        }
        // 🔹 Remove 'active' from all rows, then add it to the selected row
        grid.tbody.find("tr").removeClass("active");
        $(selectedRow).addClass("active");

        currentCartItem = selectedItem;
        deleteCurrentCartItem = selectedItem;
    }
});


$("#cartItemActionWindow").kendoWindow({
    width: "1240px",
    title: false,
    visible: false,
    modal: true
});

function currentItem_QtyOnChange(number) {
    keyPressBeep();
    number = parseInt(number || '0');
    if (number == 0) {
        return;
    }
    if (currentCartItem.ImeiId !== null && currentCartItem.ImeiId !== undefined) {
        return;
    }
    //var discount = currentCartItem.AllowedDiscount === true ? (currentCartItem.Price * (currentCartItem.Discount / 100)) : 0;
    var tax = currentCartItem.IsTaxable === true ? (currentCartItem.Price * (currentCartItem.TaxRate / 100)) : 0;

    var cart = $("#cartGrid").data("kendoGrid");
    $.each(cartData, function (index, obj) {
        if (obj.Id === currentCartItem.Id) {
            obj.Qty = number;
            obj.Tax = tax * obj.Qty;
            obj.Total = obj.Price * obj.Qty;
            return false;
        }
    });
    $.each(saleModel.pItems, function (index, obj) {
        if (obj.SaleItemID === currentCartItem.Id) {
            obj.Quantity = number;
            obj.Tax = tax * obj.Quantity;
            obj.Total = obj.UnitPrice * obj.Quantity;
            found = obj;
            return false;
        }
    });
    currentCartItem.Qty = number;
    $(".currentItem_Qty").val(currentCartItem.Qty);
    cart.dataSource.data(cartData);
    updateTotals();
}


function increaseQty() {
    keyPressBeep();
    if (currentCartItem.ImeiId !== null
        && currentCartItem.ImeiId !== undefined) {
        return;
    }
    //var discount = currentCartItem.AllowedDiscount === true ? (currentCartItem.Price * (currentCartItem.Discount / 100)) : 0;
    var tax = currentCartItem.IsTaxable === true ? (currentCartItem.Price * (currentCartItem.TaxRate / 100)) : 0;

    var cart = $("#cartGrid").data("kendoGrid");
    $.each(cartData, function (index, obj) {
        if (obj.Id === currentCartItem.Id) {
            obj.Qty += 1;
            obj.Tax = tax * obj.Qty;
            obj.Total = obj.Price * obj.Qty;
            return false;
        }
    });
    $.each(saleModel.pItems, function (index, obj) {
        if (obj.SaleItemID === currentCartItem.Id) {
            obj.Quantity += 1;
            obj.Tax = tax * obj.Quantity;
            obj.Total = obj.UnitPrice * obj.Quantity;
            found = obj;
            return false;
        }
    });
    currentCartItem.Qty += 1;
    $(".currentItem_Qty").val(currentCartItem.Qty);
    cart.dataSource.data(cartData);
    updateTotals();

}

function decreaseQty() {
    keyPressBeep();

    if (currentCartItem.ImeiId !== null
        && currentCartItem.ImeiId !== undefined) {
        return;
    }

    var cart = $("#cartGrid").data("kendoGrid");
    $.each(cartData, function (index, obj) {
        if (obj.Id === currentCartItem.Id && obj.Qty > 1) {
            var discount = obj.AllowedDiscount === true ? obj.Price * obj.DiscountAllowed / 100 : 0;
            var tax = obj.IsTaxable === true ? obj.Price * obj.TaxRate / 100 : 0;
            obj.Qty -= 1;
            obj.Discount = discount * obj.Qty,
                obj.Tax = tax * obj.Qty,
                obj.Total = ((obj.Price - discount + tax) * obj.Qty);
            return false;
        }
    });
    $.each(saleModel.pItems, function (index, obj) {
        if (obj.SaleItemID === currentCartItem.Id && obj.Quantity > 1) {
            var discount = currentCartItem.AllowedDiscount === true ? obj.UnitPrice * currentCartItem.DiscountAllowed / 100 : 0;
            var tax = currentCartItem.IsTaxable === true ? obj.UnitPrice * currentCartItem.TaxRate / 100 : 0;
            obj.Quantity -= 1;
            obj.Discount = discount * obj.Quantity,
                obj.Tax = tax * obj.Quantity,
                obj.Total = ((obj.UnitPrice + tax - discount) * obj.Quantity);
            obj.Total = obj.UnitPrice * obj.Quantity;
            return false;
        }
    });

    if (currentCartItem.Qty > 1) {
        currentCartItem.Qty -= 1;
        $(".currentItem_Qty").val(currentCartItem.Qty);
    }
    cart.dataSource.data(cartData);
    updateTotals();

}
var itemQtyKeppadVal = "";
function setItemQuantity(value) {

    if (currentCartItem.ImeiId !== null
        && currentCartItem.ImeiId !== undefined) {
        return;
    }

    if (value === 'clear') {
        itemQtyKeppadVal = "";
    } else {
        itemQtyKeppadVal += value;
    }

    currentCartItem.Qty = itemQtyKeppadVal ? parseFloat(itemQtyKeppadVal) : 1;
    if (currentCartItem.Qty <= 0) {
        currentCartItem.Qty = 1;
    }
    $(".currentItem_Qty").val(currentCartItem.Qty);

    keyPressBeep();
    var cart = $("#cartGrid").data("kendoGrid");
    $.each(cartData, function (index, obj) {
        if (obj.Id === currentCartItem.Id) {
            var discount = obj.AllowedDiscount === true ? obj.Price * obj.DiscountAllowed / 100 : 0;
            var tax = obj.IsTaxable === true ? obj.Price * obj.TaxRate / 100 : 0;
            obj.Qty = currentCartItem.Qty;
            obj.Discount = discount * currentCartItem.Qty,
                obj.Tax = tax * currentCartItem.Qty,
                obj.Total = ((obj.Price - discount + tax) * obj.Qty);
            return false;
        }
    });
    $.each(saleModel.pItems, function (index, obj) {
        if (obj.SaleItemID === currentCartItem.Id) {
            var discount = currentCartItem.AllowedDiscount === true ? obj.UnitPrice * currentCartItem.DiscountAllowed / 100 : 0;
            var tax = currentCartItem.IsTaxable === true ? obj.UnitPrice * currentCartItem.TaxRate / 100 : 0;
            obj.Quantity = currentCartItem.Qty;
            obj.Discount = discount * obj.Quantity,
                obj.Tax = tax * obj.Quantity,
                obj.Total = ((obj.UnitPrice + tax - discount) * obj.Quantity);
            found = obj;
            return false;
        }
    });
    cart.dataSource.data(cartData);
    updateTotals();

}

var itemPriceKeppadVal = "";
function setCartItemPrice(value) {
    keyPressBeep();

    itemPriceKeppadVal = value;
    currentCartItem.Price = itemPriceKeppadVal ? parseFloat(itemPriceKeppadVal) : 0;
    if (currentCartItem.Price < 0) {
        currentCartItem.Price = 0;
    }

    var cart = $("#cartGrid").data("kendoGrid");
    $.each(cartData, function (index, obj) {
        if (obj.Id === currentCartItem.Id) {
            obj.Price = currentCartItem.Price;
            var discount = obj.AllowedDiscount === true ? obj.Price * obj.DiscountAllowed / 100 : 0;
            var tax = obj.IsTaxable === true ? obj.Price * obj.TaxRate / 100 : 0;
            obj.Profit = ((obj.Cost / obj.Price) * 100).toFixed(2);
            obj.Discount = discount * currentCartItem.Qty,
                obj.Tax = tax * currentCartItem.Qty,
                obj.Total = ((obj.Price - discount + tax) * obj.Qty);
            return false;
        }
    });
    $.each(saleModel.pItems, function (index, obj) {
        if (obj.SaleItemID === currentCartItem.Id) {
            obj.UnitPrice = currentCartItem.Price;
            var discount = currentCartItem.AllowedDiscount === true ? obj.UnitPrice * currentCartItem.DiscountAllowed / 100 : 0;
            var tax = currentCartItem.IsTaxable === true ? obj.UnitPrice * currentCartItem.TaxRate / 100 : 0;
            obj.Discount = discount * obj.Quantity,
                obj.Tax = tax * obj.Quantity,
                obj.Total = ((obj.UnitPrice + tax - discount) * obj.Quantity);
            found = obj;
            return false;
        }
    });
    cart.dataSource.data(cartData);
    updateTotals();

}
function setItemPrice(value) {

    if (value === 'clear') {
        itemPriceKeppadVal = "";
    } else {
        itemPriceKeppadVal += value;
    }

    $("#cartItemPriceInput").val(itemPriceKeppadVal);
    $("#cartItemPriceInput").focus();

    setCartItemPrice(itemPriceKeppadVal);

}
function setItemTax(value) {

    if (value === 'clear') {
        itemPriceKeppadVal = "";
    } else {
        itemPriceKeppadVal += value;
    }

    $("#cartItemPriceInput").val(itemPriceKeppadVal);
    $("#cartItemPriceInput").focus();

    setCartItemPrice(itemPriceKeppadVal);

}
function removeCartItem() {
    if (!currentCartItem) {
        return;
    }
    keyPressBeep();
    var cart = $("#cartGrid").data("kendoGrid");
    cartData = $.grep(cartData, function (n, i) {
        return n.Id !== currentCartItem.Id;
    });
    saleModel.pItems = $.grep(saleModel.pItems, function (n, i) {
        return n.SaleItemID !== currentCartItem.Id;
    });
    cart.dataSource.data(cartData);
    updateTotals();
    closeCartItemActionWindow();
}

function closeCartItemActionWindow() {
    keyPressBeep();
    var win = $("#cartItemActionWindow").data("kendoWindow");
    win.close();
    currentCartItem = null;
}

$("#newCartItemWindow").kendoWindow({
    width: "630px",
    title: false,
    visible: false,
    modal: true
});

function openNewCartItemWindow() {
    $("#itemName").val("");
    $("#itemDescription").val("");
    $("#itemImei").val("");
    $("#itemSalePrice").val(0);
    $("#itemPurchaseCost").val(0);

    var win = $("#newCartItemWindow").data("kendoWindow");
    win.center().open();
    setTimeout(function () { $("#itemName").focus(); }, 500);
}

function windowIsOpen(windowId) {
    var wnd = $("#" + windowId).data("kendoWindow");
    return !wnd.element.is(":hidden");
}

function addAnonymousCartItem() {
    if (!windowIsOpen("newCartItemWindow")) {
        return;
    }
    var name = $("#itemName").val();
    var description = $("#itemDescription").val();
    var imei = $("#itemImei").val();
    var tax = parseInt($("#itemTax").val()) || 13;
    var salePrice = parseFloat($("#itemSalePrice").val()) || 0;
    var purchaseCost = parseFloat($("#itemPurchaseCost").val()) || 0;

    currentCartItem = {
        ItemID: null,
        ServiceID: null,
        IsTaxable: true,
        TaxRate: tax,
        Name: name + (imei ? " " + imei : ""),
        Description: description,
        SalePrice: salePrice,
        PurchaseCost: purchaseCost
    };
    var cart = $("#cartGrid").data("kendoGrid");
    if (cart) {
        updateCart(cart, currentCartItem);
    }

    closeNewCartItemWindow();
}

function closeNewCartItemWindow() {
    keyPressBeep();
    var win = $("#newCartItemWindow").data("kendoWindow");
    win.close();
    currentCartItem = null;
}

var item = null;
var itemVariant = null;
function addToCart(barcode) {
    if (!barcode) {
        return;
    }
    keyPressBeep();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "json",
        url: '/Sale/SearchByItemNo?id=' + barcode,
        async: true,
        success: function (item) {

            unblockUI();
            if (!item) {
                //alert("Item not found");
                return;
            }

            var cart = $("#cartGrid").data("kendoGrid");
            if (cart) {
                updateCart(cart, item);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function updateCart(cart, item) {
    var foundItem = null;
    var count = cartData.length;
    var id = kendo.guid();
    $.each(cartData, function (index, obj) {
        if (obj.FkImeiID == null) {
            if ((item.ItemID !== null ?
                (obj.FKItemID === item.ItemID && obj.FkUnitID === item.FkUnitID)
                : (item.ServiceID !== null && item.ServiceID !== undefined
                    ? obj.FKServiceID === item.ServiceID : false)
            )) {
                var discount = obj.AllowedDiscount === true ? obj.Price * obj.DiscountAllowed / 100 : 0;
                var tax = obj.IsTaxable === true ? obj.Price * obj.TaxRate / 100 : 0;
                obj.Qty += 1;
                obj.Discount = discount * obj.Qty;
                obj.Tax = tax * obj.Qty;
                obj.Total = ((obj.Price - discount + tax) * obj.Qty);
                foundItem = obj;
                return false;
            }
        } else {
            if (obj.FkImeiID === item.ImeiId) {
                foundItem = obj;
                return false;
            }
        }
    });
    if (!foundItem) {
        var discount = item.AllowedDiscount === true ? (item.SalePrice * (item.Discount / 100)) : 0;
        var tax = item.IsTaxable === true ? (item.SalePrice * (item.TaxRate / 100)) : 0;
        saleModel.pItems.push({
            SaleItemID: id,
            Quantity: 1,
            Description: item.Name,
            UnitPrice: item.SalePrice,
            Discount: discount,
            Tax: tax,
            Total: (item.SalePrice - discount + tax),
            FKItemID: item.ItemID,
            FkImeiID: item.ImeiId,
            FKServiceID: item.ServiceID,
            FkUnitID: item.FkUnitID,
            FKSaleID: saleModel.SaleID,
            WarrantyCode: item.WarrantyCode
        });
        cartData.push({
            Id: id,
            Index: count + 1,
            FKItemID: item.ItemID,
            FkImeiID: item.ImeiId,
            FKServiceID: item.ServiceID,
            FkUnitID: item.FkUnitID,
            Description: item.Name,
            Qty: 1,
            Price: item.SalePrice,
            Cost: item.PurchaseCost,
            Profit: item.SalePrice == 0 ? 0 : (((item.SalePrice - item.PurchaseCost) / item.SalePrice) * 100).toFixed(2),
            AllowedDiscount: item.AllowedDiscount,
            DiscountAllowed: item.Discount,
            Discount: discount,
            IsTaxable: item.IsTaxable,
            TaxRate: item.TaxRate,
            Tax: tax,
            Total: (item.SalePrice - discount + tax),
            WarrantyCode: item.WarrantyCode
        });
    } else {
        if (foundItem.FkImeiID === null) {
            $.each(saleModel.pItems, function (index, obj) {
                if ((item.ItemID !== null ?
                    (obj.FKItemID === item.ItemID && obj.FkUnitID === item.FkUnitID)
                    : (obj.FKServiceID === item.ServiceID))) {
                    var discount = item.AllowedDiscount === true ? (obj.UnitPrice * (item.Discount / 100)) : 0;
                    var tax = item.IsTaxable === true ? (obj.UnitPrice * (item.TaxRate / 100)) : 0;
                    obj.Quantity += 1;
                    obj.Discount = discount * obj.Quantity,
                        obj.Tax = tax * obj.Quantity,
                        obj.Total = ((obj.UnitPrice + tax - discount) * obj.Quantity);
                    found = obj;
                    return false;
                }
            });
        }
    }
    updateTotals();
    cart.dataSource.data(cartData);
}

function MakeTaxlessAllItems() {
    var cart = $("#cartGrid").data("kendoGrid");
    if (!cart) return;

    // Update cartData (grid items)
    $.each(cartData, function (i, obj) {
        obj.IsTaxable = false;
        obj.TaxRate = 0;
        obj.Tax = 0;

        // recalc total
        obj.Total = (obj.Price - obj.Discount) * obj.Qty;
    });

    // Update saleModel items (backend model)
    $.each(saleModel.pItems, function (i, obj) {
        obj.Tax = 0;
        obj.Total = (obj.UnitPrice - obj.Discount) * obj.Quantity;
    });

    updateTotals();
    cart.dataSource.data(cartData);
}
function updateTotals(taxRate) {

    var cart = $("#cartGrid").data("kendoGrid");

    // ===== HANDLE TAXLESS =====
    if (taxRate === 0) {
        MakeTaxlessAllItems();

        saleModel.TaxAmount = 0;
        $("#saleModel_GST").text('$0.00');

        saleModel.Total =
            saleModel.SubTotal -
            saleModel.DiscountAmount;

        $(".saleModel_Total").text('$' + saleModel.Total.toFixed(2));
        return;
    }

    // ===== APPLY TAX =====
    if (taxRate) {
        $.each(saleModel.pItems, function (index, obj) {
            var tax = (obj.UnitPrice * taxRate) / 100 || 0;
            obj.Tax = tax * obj.Quantity;
        });

        // Sync cart grid tax
        $.each(cartData, function (index, obj) {
            var tax = (obj.Price * taxRate) / 100 || 0;
            obj.TaxRate = taxRate;
            obj.IsTaxable = true;
            obj.Tax = tax * obj.Qty;
            obj.Total = (obj.Price - obj.Discount + tax) * obj.Qty;
        });

        cart.dataSource.data(cartData);
    }

    // ===== RE-CALCULATE TOTALS =====
    saleModel.SubTotal = 0;
    saleModel.DiscountAmount = 0;
    saleModel.TaxAmount = 0;

    $.each(saleModel.pItems, function (index, obj) {
        saleModel.SubTotal += obj.UnitPrice * obj.Quantity;
        saleModel.DiscountAmount += obj.Discount;
        saleModel.TaxAmount += obj.Tax;
    });

    // Global discount %
    saleModel.DiscountAmount =
        saleModel.SubTotal * (saleModel.Discount / 100);

    // ===== UI UPDATE =====
    $("#saleModel_SubTotal").text('$' + saleModel.SubTotal.toFixed(2));
    $(".saleModel_Discount").text(saleModel.Discount.toFixed(2) + '%');
    $("#saleModel_GST").text('$' + saleModel.TaxAmount.toFixed(2));

    saleModel.Total =
        saleModel.SubTotal -
        saleModel.DiscountAmount +
        saleModel.TaxAmount;

    $(".saleModel_Total").text('$' + saleModel.Total.toFixed(2));
}

function switchBetweenItemAndVariants(showItems, groupID) {
    keyPressBeep();
    if (showItems) {
        $("#" + groupID + "_items").slideDown();
        $("#" + groupID + "_variants").slideUp();
    } else {
        $("#" + groupID + "_items").slideUp();
        $("#" + groupID + "_variants").slideDown();
    }
}
function switchBetweenItemAndIngrediants(showVariants, groupID) {
    keyPressBeep();
    if (showVariants) {
        $("#" + groupID + "_variants").slideDown();
        $("#" + groupID + "_ingredaints").slideUp();
    } else {
        $("#" + groupID + "_variants").slideUp();
        $("#" + groupID + "_ingredaints").slideDown();
    }
}

$("#discountWindow").kendoWindow({
    width: "500px",
    title: false,
    visible: false,
    modal: true
});

function addDiscount() {
    keyPressBeep();
    if (saleModel.Discount > 0 || saleModel.Total > 0) {
        $(".saleModel_Discount").html(saleModel.Discount + "%");
        var win = $("#discountWindow").data("kendoWindow");
        win.center().open();
    }
}

var dicountkeypadVal = "";
function setDiscount(value) {
    keyPressBeep();
    if (value === 'clear') {
        dicountkeypadVal = "";
    } else {
        dicountkeypadVal += value;
    }

    saleModel.Discount = dicountkeypadVal ? parseFloat(dicountkeypadVal) : 0;
    updateTotals();
}

function closeDiscountWindow() {
    keyPressBeep();
    if (saleModel.Total >= 0) {
        var win = $("#discountWindow").data("kendoWindow");
        win.close();
    }
}
function cancelDiscount(value) {
    keyPressBeep();
    dicountkeypadVal = "";

    saleModel.Discount = 0;
    updateTotals();
    closeDiscountWindow();
}

function taxLess() {
    updateTotals(0);
}
function taxApplied() {
    //if (confirm("Are you sure you wan to do this?")) {
    //}

    updateTotals(13);
}

$("#firstNationsTaxDetailWindow").kendoWindow({
    width: "630px",
    title: false,
    visible: false,
    modal: true
});

function openFirstNationsTaxDetailWindowWindow() {
    $("#taxCustomerName").val("");
    $("#taxCustomerCardNumber").val("");
    $("#taxCustomerPhone").val("");
    $("#taxCustomerAddress").val("");
    $("#taxCustomerCardNumber").val("");
    $("#taxCustomerNotes").val("");

    var win = $("#firstNationsTaxDetailWindow").data("kendoWindow");
    win.center().open();
}

function addFirstNationsTaxDetail() {

    var name = $("#taxCustomerName").val();
    var taxNumber = $("#taxCustomerTaxNumber").val();
    var cardNumber = $("#taxCustomerCardNumber").val();
    var notes = $("#taxCustomerNotes").val();
    var phone = $("#taxCustomerPhone").val();
    var address = $("#taxCustomerAddress").val();

    if (!name || !taxNumber) {
        return $().toastmessage('showToast', {
            text: "Please enter name and HST",
            sticky: false,
            position: 'bottom-right',
            type: 'error'
        });
    }

    saleModel.CustomerName = name;
    $("#saleCustomerName").val(name);
    saleModel.CustomerTaxNumber = taxNumber;
    $("#saleCustomerTaxNumber").val(name);
    saleModel.CustomerCardNumber = cardNumber;
    saleModel.CustomerNotes = notes;
    saleModel.CustomerPhone = phone;
    saleModel.CustomerAddress = address;

    updateTotals(5); // apply 5% tax for this sale

    closeFirstNationsTaxDetailWindow();
}

function closeFirstNationsTaxDetailWindow() {
    keyPressBeep();
    var win = $("#firstNationsTaxDetailWindow").data("kendoWindow");
    win.close();
}


function getItemVariantImage(thisImage, itemID, itemVariantImage) {
}

function switchBetweenGroupAndPayment(enablePayment) {
    keyPressBeep();
    if (enablePayment) {
        $("#payment_view").slideDown();
        $("#group_tab_view").slideUp();
    } else {
        $("#payment_view").slideUp();
        $("#group_tab_view").slideDown();
    }
    switchBetweenQuickCashAndProviderList(true);
}

function selectProvider(type) {
    keyPressBeep();
    saleModel.SaleType = type;
    saleModel.Received = 0;
    saleModel.Due = saleModel.Total - saleModel.Received;
    $(".saleModel_Payment").html(saleModel.Received.toFixed(2));
    $(".saleModel_Balance").html(saleModel.Due.toFixed(2));

    switchBetweenQuickCashAndProviderList(false);
}

function switchBetweenQuickCashAndProviderList(enableQuickCash) {

    if (enableQuickCash) {
        //$("#quickCashContent").slideDown();
        $("#providerListContent").slideUp();
    } else {
        //$("#quickCashContent").slideUp();
        $("#providerListContent").slideDown();
    }
}

$("#paymentWindow").kendoWindow({
    width: "800px",
    title: false,
    visible: false,
    modal: true,
    activate: function () {

        $("#paymentWindow").unbind("keydown");
        $("#paymentWindow").keydown(function (e) {

            if (event.which == '10' || event.which == '13') {

                addSale();
                e.preventDefault();
                return false;
            }

            if (event.keyCode === 27) {

                closePaymentWindow();
                e.preventDefault();
                return false;
            }
        });
        $("#receiveAmountInput").val(saleModel.Received);

    }
});
var keypadVal = "";
function addPayment(type, amount) {
    keyPressBeep();
    keypadVal = "";
    saleModel.SaleType = type;
    var win = $("#paymentWindow").data("kendoWindow");
    win.center().open();
    saleModel.Received = amount ? amount === 40 ? saleModel.Total : amount : saleModel.Total;
    saleModel.Due = saleModel.Total - saleModel.Received;
    $(".saleModel_Payment").html(saleModel.Received.toFixed(2));
    $(".saleModel_Balance").html(saleModel.Due.toFixed(2));

    setTimeout(function () {
        $("#receiveAmountInput").val(saleModel.Received.toFixed(2));
        $("#receiveAmountInput").focus();
        $("#receiveAmountInput").select();
    }, 1000);

}

function setPaymentReceive(value) {
    keyPressBeep();

    keypadVal = value;

    saleModel.Received = value ? parseFloat(value) : 0;
    saleModel.Due = (saleModel.Total - saleModel.Received).toFixed(2);
    $(".saleModel_Payment").html(value ? value : 0);
    $(".saleModel_Balance").html(saleModel.Due);

    if (saleModel.SaleType === "Cash") {
        $("#cash_amount").html(saleModel.Received);
        $("#credit_amount").html(0);
    }
    if (saleModel.SaleType === "Credit Card") {
        $("#credit_amount").html(saleModel.Received);
        $("#cash_amount").html(0);
    }
}

function setPayment(value) {
    keyPressBeep();
    if (value === 'clear') {
        keypadVal = "";
    } else {
        keypadVal += value;
    }

    $("#receiveAmountInput").val(keypadVal);
    $("#receiveAmountInput").focus();

    setPaymentReceive(keypadVal);
}

function setOrderType(orderType) {
    saleModel.OrderType = orderType;
    $("#orderType").val(saleModel.OrderType);
}

function setSaleCustomerTaxNumber(tn) {
    saleModel.CustomerTaxNumber = tn.value;
}

function setSaleCustomerEmail(email) {
    saleModel.CustomerEmail = email.value;
}

function setSaleComments(comments) {
    saleModel.Comments = comments.value;
}

function setSaleCustomerName(name) {
    saleModel.CustomerName = name.value;
}

function setSaleCustomerPhone(phone) {
    saleModel.CustomerVat = phone.value;//already implemented customer vat 
    saleModel.CustomerPhone = phone.value;//to save its phone sa well 🤷‍
}

function closePaymentWindow() {
    keyPressBeep();
    var win = $("#paymentWindow").data("kendoWindow");
    win.close();
}

function addSale() {
    debugger;
    if (!windowIsOpen("paymentWindow")) {
        return;
    }
    keyPressBeep();

    if (saleModel.pItems.length <= 0) {
        return $().toastmessage('showToast', {
            text: "Please add items",
            sticky: false,
            position: 'bottom-right',
            type: 'error'
        });
    }

    if (saleModel.Due > 0) {
        if (!confirm("You are going to sale with due payment, are you sure you want to continue?")) {
            return false;
        }
    }

    //if (!saleModel.Received || saleModel.Received <= 0) {
    //    if (!confirm("You are going to sale without payment, are you sure you want to continue?")) {
    //        return false;
    //    }
    //}

    //if (saleModel.TaxAmount > 0
    //    && !saleModel.CustomerTaxNumber) {
    //    return $().toastmessage('showToast', {
    //        text: "Please enter Tax Exemption ID",
    //        sticky: false,
    //        position: 'bottom-right',
    //        type: 'error'
    //    });
    //}

    blockUI();
    //if (saleModel.update) {
    //    saleModel.SaleDate = new Date();
    //    $.ajax({
    //        type: "POST",
    //        contentType: 'application/json; charset=utf-8',
    //        url: '/Pos/UpdateSale',
    //        data: JSON.stringify(saleModel),
    //        async: true,
    //        success: function (msg) {
    //            if (msg.saleid && msg.saleid !== "00000000-0000-0000-0000-000000000000") {
    //                //$('#saleid').val(msg.saleid);
    //                closePaymentWindow();
    //                refreshPage();
    //                printReceipt(msg.Sale);
    //            }
    //            else {
    //                closePaymentWindow();
    //                unblockUI();
    //                return $().toastmessage('showToast', {
    //                    text: msg.message,
    //                    sticky: false,
    //                    position: 'bottom-right',
    //                    type: 'error'
    //                });
    //            }
    //            unblockUI();
    //        },
    //        error: function (jqXHR, textStatus, errorThrown) {
    //            handleErrors(textStatus);
    //        }
    //    });
    //    return;
    //}
    $.ajax({
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        url: '/Pos/AddSale',
        data: JSON.stringify({ Sale: saleModel }),
        async: true,
        success: function (msg) {
            if (msg.saleid && msg.saleid !== "00000000-0000-0000-0000-000000000000") {
                //$('#saleid').val(msg.saleid);
                closePaymentWindow();
                refreshPage();
                printReceipt(msg.Sale);
            }
            else {
                unblockUI();
                closePaymentWindow();
                return $().toastmessage('showToast', {
                    text: msg.message,
                    sticky: false,
                    position: 'bottom-right',
                    type: 'error'
                });
            }
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function addSaleForProvider(providerID) {
    keyPressBeep();
    saleModel.FKProviderID = providerID;
    if (saleModel.Due > 0) {
        if (!confirm("You are going to sale with due payment, are you sure you want to continue?")) {
            return false;
        }
    }
    blockUI();
    $.ajax({
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        url: '/Pos/AddSale',
        data: JSON.stringify({ Sale: saleModel }),
        async: true,
        success: function (msg) {
            if (msg.saleid && msg.saleid != "00000000-0000-0000-0000-000000000000") {
                refreshPage();
                printReceipt(msg.Sale);
            }
            else {
                unblockUI();
                return $().toastmessage('showToast', {
                    text: msg.message,
                    sticky: false,
                    position: 'bottom-right',
                    type: 'error'
                });
            }
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function cancelSale(saleID) {
    debugger
    keyPressBeep();
    var messge = prompt("You are going to cancel this sale, please mention the reason", "");
    if (!messge) {
        return false;
    }
    var cancelModel = { SaleID: saleID, Comments: messge };
    blockUI();
    $.ajax({
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        url: '/Pos/CancelSale',
        data: JSON.stringify({ Sale: cancelModel }),
        async: true,
        success: function (msg) {
            unblockUI();
            successToast();
            SalesScreen();
            getCashCounter();
            getTotalSale();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function reprintInvoice(s) {
    printReceipt(s);
}

function printLastInvoice() {
    $.ajax({
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        url: '/Pos/GetLastSaleInfo',
        async: true,
        success: function (msg) {
            console.log(msg)
            if (msg.SaleID && msg.SaleID !== "00000000-0000-0000-0000-000000000000") {
                //$('#saleid').val(msg.saleid);
                debugger;
                closePaymentWindow();
                refreshPage();
                printReceipt(msg);
            } else {
                $().toastmessage('showToast', {
                    text: "Last Sale Info Not Found!",
                    sticky: false,
                    position: 'bottom-right',
                    type: 'error'

                });
            }
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
//function printReceipt(sale) {
//    if (!sale) {
//        return;
//    }
//    window.LastInvoice = sale;
//    var customer = {
//        CustomerName: sale.CustomerName,
//        CustomerVat: sale.CustomerVat,
//        CustomerPhone: sale.CustomerPhone,
//        CustomerAddress: sale.CustomerAddress,
//        CustomerEmail: sale.CustomerEmail,
//        CustomerTaxNumber: sale.CustomerTaxNumber
//    };
//    var sr = sale.RefNO;
//    var date = kendo.toString(kendo.parseDate(sale.SaleDate), 'MM/dd/yyyy');
//    var time = kendo.toString(kendo.parseDate(sale.SaleDate), 'hh:mm tt');
//    var sn = 0;
//    var sno = 0;
//    var docprint = window.open("about:blank", "_blank");
//    docprint.document.open();
//    docprint.document.write('<html><head><title></title>');
//    docprint.document.write('<style>span { margin:1px; } @media all {');
//    docprint.document.write('.page-break	{ display: none; }}');
//    docprint.document.write('@media print {');
//    docprint.document.write('.page-break	{ display: block; page-break-before: always; }}');
//    docprint.document.write('</style>');
//    docprint.document.write('</head><body style="font-size:12px;padding-right:15px">');
//    //docprint.document.write('</head><body style="border: 1px solid;width:390px;font-size:14px;padding-right:10px">');
//    // page 1
//    docprint.document.write('<div class="page-break" style="display:block;">');
//    //docprint.document.write('<div class="col-lg-12" style="text-align:center"><img src="/Content/Images/event_icon.png" /></div>');
//    docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;font-weight:bold;font-size:16px;'>TechSource Canada</div>");
//    docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;font-weight:bold;font-size:16px;'>1012 Gerrard Street East</div>");
//    docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;font-weight:bold;font-size:16px;'>Toronto, Ontario M4M 1Z3</div>");
//    docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;font-weight:bold;font-size:16px;'>416 466 1222</div>");
//    docprint.document.write(`<br/><div style=float:left;width:100%;text-align:center;font-weight:bold;font-size:16px;'><img src='data:image/png;base64,${sale.QrCodeStr}' id='qrcode-element' style='width:100px'></div>`);
//    docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;'></div>");

//    var header = "<br/><div style='display:flex;flex-direction:column;justify-content:start;padding:10px;'>"
//        + "<div style='display:flex;justify-content:space-between;'>"
//        + "<div style='display:flex;justify-content:start;'><div>Date: </div><div>&nbsp;"
//        + date + "</div></div>"
//        + "<div style='display:flex;justify-content:start;'><div>Time: </div><div>&nbsp;"
//        + time + "</div></div>"
//        + "</div>"
//        + "<div style='display:flex;justify-content:start;'><div>Reciept No: </div><div>&nbsp;"
//        + sr + "</div></div>";


//    if (sale.HstNumber) {
//        header += "<div style='display:flex;justify-content:start;'><div>HST: </div><div>"
//            + "&nbsp;" + sale.HstNumber + "</div></div>";
//    }
//    header += "<div style='display:flex;justify-content:start;'><div>Sale Type: </div><div>"
//        + "&nbsp;" + sale.SaleType + "</div></div>";

//    header += "<div style='display:flex;justify-content:start;'><b>Customer Info</b></div>"

//    header += "<div style='display:flex;justify-content:start;'><div>Name: </div><div>"
//        + "&nbsp;" + (customer.CustomerName ? customer.CustomerName : '') + "</div></div>";


//    header += "<div style='display:flex;justify-content:start;'><div>Phone: </div><div>"
//        + "&nbsp;" + (customer.CustomerPhone ? customer.CustomerPhone : '') + "</div></div>";

//    header += "<div style='display:flex;justify-content:start;'><div>Email: </div><div>"
//        + "&nbsp;" + (customer.CustomerEmail ? customer.CustomerEmail : '') + "</div></div>";

//    if (customer.CustomerTaxNumber) {
//        header += "<div style='display:flex;justify-content:start;'><div>Customer HST: </div><div>"
//            + "&nbsp;" + customer.CustomerTaxNumber + "</div></div>";
//    }
//    if (customer.CustomerAddress) {
//        header += "<div style='display:flex;justify-content:start;'><div>Customer Address: </div><div>"
//            + "&nbsp;" + customer.CustomerAddress + "</div></div>";
//    }
//    header += "</div>";

//    docprint.document.write(header);
//    docprint.document.write("<table style='padding:5px;width:98%;'>"
//        + "<tr style='font-size:12px !important;font-weight:bold'>"
//        + "<th>" + "Qty." + "</th>"
//        + "<th style='text-align: left;'>" + "Description" + "</th>"
//        + "<th>" + "Price" + "</th>"
//        + "<th>" + "Tax" + "</th>"
//        + "<th>" + "Total" + "</th>"
//        + "</tr>");
//    $.each(sale.SaleItems, function (index, obj) {
//        var itemno = $(this).find(".item-search").val();
//        sno += sn + 1;
//        var desc = obj.Description;
//        var qty = obj.Qty;
//        var price = obj.Price;
//        var tax = obj.Tax;
//        var total = obj.Total;
//        //"</span><span style='font-weight:bold;float:left;'>" + itemno +
//        docprint.document.write("<tr style='font-size:12px;'>"
//            + "<td style='text-align:center;'>" + qty + "</td>"
//            + "<td>" + desc + "</td>"
//            + "<td style='text-align:center;'>$" + price + "</td>"
//            + "<td style='text-align:center;'>$" + tax + "</td>"
//            + "<td style='text-align:center;'>$" + parseFloat(total).toFixed(2) + "</td>"
//            + "</tr>");

//    });
//    docprint.document.write("</table>");
//    var gTotal = sale.Total;
//    var subTotal = sale.SubTotal;
//    var gst = sale.GST;
//    var disc = sale.Discount;
//    var payment = sale.Received;
//    var returned = -(sale.Due);
//    if (disc == "") {
//        disc = 0;
//    }

//    docprint.document.write("<div style='float:left;width:90%;padding: 20px;'><div style='float:left;width:100%;text-align:right;font-size:14px;font-weight:bold;margin-top:10px;margin-right:15px;'>Sub Total: $" + subTotal.toFixed(2) + "</div>");
//    docprint.document.write("<div style='float:left;width:100%;text-align:right;font-size:14px;font-weight:bold;padding-right:10px;'> HST: $" + gst.toFixed(2) + "</div>");
//    docprint.document.write("<div style='float:left;width:100%;text-align:right;font-size:14px;font-weight:bold;padding-right:10px;'>Discount: $" + disc.toFixed(2) + "</div>");
//    docprint.document.write("<div style='float:left;width:100%;text-align:right;font-size:14px;font-weight:bold;padding-right:10px;'>Grand Total: $" + gTotal.toFixed(2) + "</div>");

//    generateBarcode("#barcode", sr);

//    var barcode = $("#barcode")[0];

//    docprint.document.write("<div style='float:left;width:100%;text-align:center;font-size:10px;font-weight:bold'>ALL SALES ARE FINAL</div>");
//    docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;font-size:10px;font-weight:bold'>30 DAYS EXCHANGE FOR STORE CREDIT</div>");
//    docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;font-size:10px;font-weight:bold'>ON DEFECTIVE ITEMS </div>");
//    docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;font-size:10px;font-weight:bold'>WITH RECEIPT AND ORIGINAL PACKAGING</div>");
//    docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;font-size:10px;font-weight:bold'>NO WARRANTY ON PHYSICAL & LIQUID DAMAGE</div>");
//    docprint.document.write("<br/><br/><div style='float:left;width:100%;text-align:center;font-size:10px;font-weight:bold'>Thank you for your business!</div>");
//    docprint.document.write('</div>');
//    docprint.document.write("<br/><br/><div id='barcode-element' style='float:left;width:100%;text-align:center;font-size:20px;font-weight:bold'></div>");
//    docprint.document.write("</div>");

//    var qrCodeEl = docprint.document.getElementById('barcode-element');
//    qrCodeEl.appendChild(barcode);

//    var canvas = document.createElement("canvas");
//    canvas.id = 'barcode';
//    document.getElementById("barcode-container").appendChild(canvas);
//    docprint.document.close();
//    //return;
//    docprint.print();


//    docprint.close();
//}
function postPrint() {
    try {
        window.external.OpenDrawer();
    } catch (e) {
        console.debug(e.message);
    }
}
function refundInvoice(id) {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Pos/SaleRefund?id=' + id,
        async: true,
        success: function (data) {
            $("#sales_refund_screen").html("");
            $("#sales_screen").html(data);
            switchSalesScreen(true);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function switchSalesRefundScreen(showSales) {
    keyPressBeep();
    if (showSales) {
        $(".not_main_screen").slideUp();
        $("#sales_refund_screen").slideDown();
        $("#sales_screen").slideUp();
    } else {
        $("#sales_refund_screen").slideUp();
        $("#sales_screen").slideDown();
    }
}

function addRepairOrderInvoice(id) {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Pos/RepairOrderInvoice?id=' + id,
        async: true,
        success: function (data) {
            if (data.saleid && data.saleid !== "00000000-0000-0000-0000-000000000000") {
                RepairOrdersScreen();
                unblockUI();
                printReceipt(data.Sale);
            }
            else {
                unblockUI();
                closePaymentWindow();
                return $().toastmessage('showToast', {
                    text: data.message,
                    sticky: false,
                    position: 'bottom-right',
                    type: 'error'
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function printLabel(labels) {
    var docprint = window.open("about:blank", "_blank");
    docprint.document.open();
    docprint.document.write('<html><head><title></title>');
    docprint.document.write('<style>span { margin:3px; }</style>');
    docprint.document.write('</head><body style="width:288px;">');

    $.each(labels, function (index, sale) {
        var customer = sale.Customer;
        var sr = sale.OrderNo;
        var item = sale.Item;
        docprint.document.write("<div style='float:left;width:100%;'><div style='float:left;width:50%;font-size:medium;font-weight:bold;'> Order # : " + sr + "</div>");
        docprint.document.write("<div style='float:right;width:50%;font-size:medium;font-weight:bold;'> " + customer + "</div></div>");
        docprint.document.write("<div style='float:left;width:100%;'><div style='float:left;font-size:medium;font-weight:bold;margin-bottom:15px;'> " + item + "</div></div>");
    });

    docprint.document.write('</body></html>');
    docprint.document.close();
    docprint.print();

    //postLabelPrint();
    //docprint.close();
}

function labelPrintForSale(saleID) {
    keyPressBeep();
    blockUI();
    $.ajax({
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        url: '/Pos/ProcessSaleForLabelPrint',
        data: JSON.stringify({ Sale: saleModel }),
        async: true,
        success: function (msg) {

            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}


function openProcessSaleForLabelPrintWindow(id) {
    keyPressBeep();

    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Pos/ProcessSaleForLabelPrint',
        data: { saleID: id },
        async: true,
        success: function (data) {
            var dispatchWin = $("#processSaleForLabelPrintWindow");
            dispatchWin.html("");
            dispatchWin.html(data);

            dispatchWin.data("kendoWindow").open().center();
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function closeProcessSaleForLabelPrintWindow() {
    keyPressBeep();
    var win = $("#processSaleForLabelPrintWindow").data("kendoWindow");
    win.close();
}

function getCashCounterPrint(cashCounter) {

    if (!cashCounter) {
        return;
    }
    var date = dateFormat(kendo.parseDate(new Date()));

    var docprint = window.open("about:blank", "_blank");
    docprint.document.open();
    docprint.document.write('<html><head><title></title>');
    docprint.document.write('<style>span { margin:3px; }</style>');
    docprint.document.write('</head><body style="width:275px;">');
    docprint.document.write('<div class="col-lg-12" style="text-align:center"><img src="/Content/Images/pos/logo_inline.png" /></div>');

    docprint.document.write("<br/><div style='float:left;width:100%;'><div style='float:left;width:50%;'>" + date + " </div>");
    docprint.document.write("<div style='float:right;width:50%;text-align:right;'>Branch: " + cashCounter.Location + "</div>");

    docprint.document.write("<br/><div style='float:left;width:100%;'><div style='float:left;width:50%;'> Bill # </div>");
    docprint.document.write("<div style='float:right;width:50%;text-align:right;'>" + cashCounter.LastBill + "</div>");

    docprint.document.write("<br/><div style='float:left;width:100%;'><div style='float:left;width:50%;'> Number Of Sales </div>");
    docprint.document.write("<div style='float:right;width:50%;text-align:right;'>" + cashCounter.NumberOfSales + "</div>");

    docprint.document.write("<br/><div style='float:left;width:100%;'><div style='float:left;width:50%;'> Opening Balance </div>");
    docprint.document.write("<div style='float:right;width:50%;text-align:right;'>" + cashCounter.OpeningBalance + "</div>");

    docprint.document.write("<br/><div style='float:left;width:100%;'><div style='float:left;width:50%;'> Cash In Drawer </div>");
    docprint.document.write("<div style='float:right;width:50%;text-align:right;'>" + cashCounter.CashInDrawer + "</div>");

    docprint.document.write("<br/><div style='float:left;width:100%;'><div style='float:left;width:50%;'> Sales Total </div>");
    docprint.document.write("<div style='float:right;width:50%;text-align:right;'>" + cashCounter.TotalSale + "</div>");
    docprint.document.write('</body></html>');
    docprint.document.close();
    docprint.print();

    docprint.close();
}

function errorToast() {
    return $().toastmessage('showToast', {
        text: 'Something went wrong, please try again or contact support',
        sticky: false,
        position: 'bottom-right',
        type: 'warning'

    });
}
function successToast() {
    return $().toastmessage('showToast', {
        text: 'Operation Succesful',
        sticky: false,
        position: 'bottom-right',
        type: 'success'

    });
}

function handleErrors(status) {

    if (status === "401") {
        if (window.confirm('Your session has expired, please relogin')) {
            window.location = location.href;
        }
        return false;
    }
    else {
        unblockUI();
        return $().toastmessage('showToast', {
            text: 'Failed',
            sticky: false,
            position: 'bottom-right',
            type: 'error'

        });
    }
}

function dateFormat(n) {
    return n === null ? "" : kendo.toString(n, kendo.culture().calendar.patterns.g)
}

var notificationsCount = 0;
var RefreshApiCall = false;
function refreshSession() {
    if (RefreshApiCall) {
        console.log('r-c');
        return;
    }
    RefreshApiCall = true;
    $.ajax({
        type: "get",
        contentType: 'application/json; charset=utf-8',
        url: '/Pos/Refresh',
        async: true,
        success: function (msg) {
            RefreshApiCall = false;
            if (msg.PendingOrders >= 0) {
                $(".pendingOrderCount").html(msg.PendingOrders);
            }
            if (notificationsCount < msg.UnSeenNotifications) {
                notificationsCount = msg.UnSeenNotifications;
                NotificationTicker();
                PlaySound("beep");
            }
            if (msg.UnSeenNotifications >= 0) {
                $(".notification-count").html(msg.UnSeenNotifications);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            RefreshApiCall = false;
        }
    });
}

function keyPressBeep() {
    PlaySound("keypresssound");
}

function PlaySound(soundObj) {
    var sound = document.getElementById(soundObj);
    if (sound) {
        sound.play();
    }
}

function blockUI() {
    $(".overlay").show()
}
function unblockUI() {
    $(".overlay").hide();

}

function generateQRCode(url, elementId) {
    var el = document.getElementById(elementId);
    new QRious({
        element: el,
        size: 100,
        value: url,

    });
}

function generateBarcode(elementId, data) {
    JsBarcode(elementId, data, {
        width: 2,
        height: 30,
        textAlign: "center",
        fontOptions: "bold",
        margin: 10,
        fontSize: 10
    })
}

/****************************** Repair Orders ********************************/


function openNewRepairOrderWindow() {
    $("#repairOrderDeviceInfo").val("");
    $("#repairOrderDevicePassword").val("");
    $("#repairOrderAccessoriesLeft").val("");
    $("#repairOrderProblemDescription").val("");
    $("#repairOrderEstimatedCost").val(0);

    var win = $("#newRepairOrderWindow").data("kendoWindow");
    win.center().open();
}

function addNewRepairOrderRecord() {

    var deviceInfo = $("#repairOrderDeviceInfo").val();
    var devicePassword = $("#repairOrderDevicePassword").val();
    var accessoriesLeft = $("#repairOrderAccessoriesLeft").val();
    var problemDescription = $("#repairOrderProblemDescription").val();
    var estimatedCost = $("#repairOrderEstimatedCost").val();
    var customerName = $("#repairOrderCustomerName").val();
    var customerPhone = $("#repairOrderCustomerPhone").val();
    var customerEmail = $("#repairOrderCustomerEmail").val();

    var roModel = {
        Id: kendo.guid(),
        Date: new Date(),
        Model: deviceInfo,
        Password: devicePassword,
        AccessoriesLeft: accessoriesLeft,
        ProblemDescription: problemDescription,
        CustomerName: customerName,
        CustomerPhone: customerPhone,
        CustomerEmail: customerEmail,
        Services: [],
        SubTotal: estimatedCost,
        Total: estimatedCost
    };

    blockUI();

    $.ajax({
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        url: '/CustomerRepair/AddRepairOrder',
        data: JSON.stringify({ RepairOrder: roModel }),
        async: true,
        success: function (msg) {
            if (msg.saleid && msg.saleid !== "00000000-0000-0000-0000-000000000000") {
                successToast();
                SendRepairOrderToCustomer(msg.saleid);
                closeNewRepairOrderWindow();
                RepairOrdersScreen();

                notificationHub.server.reloadRepairOrders();
            }
            else {
                unblockUI();
                return $().toastmessage('showToast', {
                    text: msg.message,
                    sticky: false,
                    position: 'bottom-right',
                    type: 'error'
                });
            }
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function SendRepairOrderToCustomer(roId) {
    notificationHub.server.receiveRepairOrder(roId);
}
function closeNewRepairOrderWindow() {
    keyPressBeep();
    var win = $("#newRepairOrderWindow").data("kendoWindow");
    win.close();
}

var selectedRoId = null;
$("#printRepairOrderTagWindow").kendoWindow({
    width: "630px",
    title: false,
    visible: false,
    modal: true
});

function openPrintRepairOrderTagWindow(roId) {
    selectedRoId = roId;
    $("#numberOfPrints").val(1);
    $("#startFrom").val(0);

    var win = $("#printRepairOrderTagWindow").data("kendoWindow");
    win.center().open();
}

function printRoTags() {

    var numberOfPrints = $("#numberOfPrints").val();
    var startFrom = $("#startFrom").val();

    $("#download-pdf").attr("href", "/Pos/RepairOrderTagReport?RoId="
        + selectedRoId + "&numberOfPrints="
        + numberOfPrints + "&startFrom="
        + startFrom);
    window.open($('#download-pdf').attr('href'), "_blank");

    closeNewCartItemWindow();
}

function closePrintRepairOrderTagWindow() {
    keyPressBeep();
    var win = $("#printRepairOrderTagWindow").data("kendoWindow");
    win.close();
    selectedRoId = null;
}
// Send Email


var saleId = null;

function openEmailWindow(id) {
    saleId = id;
    $("#email").val("");
    setTimeout(function () { $("#email").focus(); }, 1000);

    var win = $("#emailWindow").data("kendoWindow");
    win.center().open();
}
function closeEmailWindow() {
    keyPressBeep();
    saleId = null
    var win = $("#emailWindow").data("kendoWindow");
    win.close();
}
function sendEmail(id, email) {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "json",
        url: '/Pos/SendEmail?saleId=' + id + '&email=' + email,
        async: true,
        success: function (customerEmail) {
            if (customerEmail) {
                successToast();
                if (windowIsOpen("emailWindow")) {
                    closeEmailWindow();
                }
                unblockUI();
            }
            else {
                openEmailWindow(id);
                unblockUI();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}


function onEmailWindowSend() {
    var email = $('#email').val();
    sendEmail(saleId, email);
    if (windowIsOpen("emailWindow")) {
        closeEmailWindow();
    }
    saleId = null;
}

function getCode(event) {
    if (event.code == "Enter" || event.code === "NumpadEnter") {
        var code = $('#code').val();
        if (code == '001') {
            openNewCartItemWindow();

        } else if (code == '002') {
            //Chart Top-up
            addWarrantyLabel('CHART TOP-UP', false, code)
        } else if (code == '003') {
            openSaleCreditAmountWindow();
        } else if (code == '004') {
            //no warranty on physical damage 
            addWarrantyLabel('NO WARRANTY ON PHYSICAL OR LIQUID DAMAGE', true, code)
        } else if (code == '005') {
            //30 days warranty
            addWarrantyLabel('30 DAYS WARRANTY', true, code)
        } else if (code == '006') {
            //90 days warranty on tv
            addWarrantyLabel('90 DAYS WARRANTY ON TV', true, code)
        } else if (code == '007') {
            //android box 
            addWarrantyLabel('ANDROID BOX', true, code)
        } else if (code == '009') {
            //009 Service charges like store credit. should be added.
            keyPressBeep();
            openServiceChargesWindow()
        }
        else if (code == '111') {
            keyPressBeep();
            openIMEISNWindow()
        }
        else {
            $().toastmessage('showToast', {
                text: 'Code not Found',
                sticky: false,
                position: 'bottom-right',
                type: 'error'

            });
            return;
        }
        ResetCodeInput();
    }
}




//IMEI/SN
function openIMEISNWindow() {
    $("#IMEISN").val("");
    setTimeout(function () { $("#IMEISN").focus(); }, 1000);

    var win = $("#IMEISNWindow").data("kendoWindow");
    win.center().open();
}
function closeIMEISNWindowWindow() {
    keyPressBeep();
    var win = $("#IMEISNWindow").data("kendoWindow");
    win.close();
}
function addIMEISN() {
    var total = saleModel.Total;
    ////Removed This check since client want to add credit for store
    //if (!saleAmountAdded && $("#saleCreditAmount").val() < saleModel.Total) {
    var imeiSn = $("#IMEISN").val();

    currentCartItem = {
        ItemID: null,
        ServiceID: null,
        IsTaxable: false,
        TaxRate: 0,
        Name: 'IMEI/SN:' + imeiSn,
        Description: null,
        SalePrice: 0,
        PurchaseCost: null
    };
    var cart = $("#cartGrid").data("kendoGrid");
    if (cart) {
        updateCart(cart, currentCartItem);
    }
    saleAmountAdded = true;
    closeIMEISNWindowWindow();
    imeiSNAdded = true;

    $("#IMEISN").val('');

}


//end IMEISN




function openServiceChargesWindow() {
    $("#serviceCharges").val("");
    setTimeout(function () { $("#serviceCharges").focus(); }, 1000);

    var win = $("#serviceChargesWindow").data("kendoWindow");
    win.center().open();
}
function closeServiceChargesWindow() {
    keyPressBeep();
    var win = $("#serviceChargesWindow").data("kendoWindow");
    win.close();
}
function addServiceCharges() {
    var total = saleModel.Total;
    ////Removed This check since client want to add credit for store
    //if (!saleAmountAdded && $("#saleCreditAmount").val() < saleModel.Total) {
    var amount = $("#serviceCharges").val();

    currentCartItem = {
        ItemID: null,
        ServiceID: null,
        IsTaxable: false,
        TaxRate: 0,
        Name: "Service Charges",
        Description: null,
        SalePrice: amount,
        PurchaseCost: null
    };
    var cart = $("#cartGrid").data("kendoGrid");
    if (cart) {
        updateCart(cart, currentCartItem);
    }
    saleAmountAdded = true;
    closeServiceChargesWindow();
    serviceChargesAdded = true;
}
function IsWarrantyCodeUsed(code) {
    var data = $("#cartGrid").data("kendoGrid").dataSource.data();
    return data.filter(x => x.WarrantyCode == code)?.length > 0 ? true : false;
}
function addWarrantyLabel(warrantyLabeltext, UniqueItemsOnly = true, warrantyCode = null) {
    keyPressBeep();
    var errorMessage = 'Item Already Added.';

    if (UniqueItemsOnly === true && IsWarrantyCodeUsed(warrantyCode)) {
        $().toastmessage('showToast', {
            text: errorMessage,
            sticky: false,
            position: 'bottom-right',
            type: 'error'

        });
        return;
    }


    var total = saleModel.Total;
    currentCartItem = {
        ItemID: null,
        ServiceID: null,
        IsTaxable: false,
        TaxRate: 0,
        Name: warrantyLabeltext,
        Description: null,
        SalePrice: 0,
        PurchaseCost: 0,
        WarrantyCode: warrantyCode
    };
    var cart = $("#cartGrid").data("kendoGrid");
    if (true || cart.dataSource?.data()?.length > 0) {
        updateCart(cart, currentCartItem);
    }

}



$(document).ready(function () {
    $("#code").focus();


    $("#saleCreditAmountWindow").kendoWindow({
        width: "630px",
        title: false,
        visible: false,
        modal: true
    });
    $("#serviceChargesWindow").kendoWindow({
        width: "630px",
        title: false,
        visible: false,
        modal: true
    });
    $("#IMEISNWindow").kendoWindow({
        width: "630px",
        title: false,
        visible: false,
        modal: true
    });

});
function openSaleCreditAmountWindow() {
    $("#saleCreditAmount").val("");
    setTimeout(function () { $("#saleCreditAmount").focus(); }, 1000);

    var win = $("#saleCreditAmountWindow").data("kendoWindow");
    win.center().open();
}
function closeSaleCrediAmountWindow() {
    keyPressBeep();
    var win = $("#saleCreditAmountWindow").data("kendoWindow");
    ResetCodeInput()
    win.close();
}
var saleAmountAdded = false;
function addSaleCreditAmount() {
    var total = saleModel.Total;
    ////Removed This check since client want to add credit for store
    //if (!saleAmountAdded && $("#saleCreditAmount").val() < saleModel.Total) {
    var amount = $("#saleCreditAmount").val() < 0 ? $("#saleCreditAmount").val() : -($("#saleCreditAmount").val());

    currentCartItem = {
        ItemID: null,
        ServiceID: null,
        IsTaxable: false,
        TaxRate: 0,
        Name: "Credit Sale",
        Description: null,
        SalePrice: amount,
        PurchaseCost: null
    };
    var cart = $("#cartGrid").data("kendoGrid");
    if (cart) {
        updateCart(cart, currentCartItem);
    }
    saleAmountAdded = true;
    closeSaleCrediAmountWindow();
    //}
    //else {
    //    $().toastmessage('showToast', {
    //        text: 'Amount already added!',
    //        sticky: false,
    //        position: 'bottom-right',
    //        type: 'error'

    //    });
    //    closeSaleCrediAmountWindow();

    //}
}
function setCartItemTax(value) {
    keyPressBeep();
    currentCartItem.TaxRate = value ? value : 0;
    if (currentCartItem.TaxRate < 0) {
        currentCartItem.TaxRate = 0;
    }

    var cart = $("#cartGrid").data("kendoGrid");
    $.each(cartData, function (index, obj) {
        if (obj.Id === currentCartItem.Id) {
            obj.TaxRate = currentCartItem.TaxRate;
            var discount = obj.AllowedDiscount === true ? obj.Price * obj.DiscountAllowed / 100 : 0;
            var tax = obj.IsTaxable === true ? obj.Price * obj.TaxRate / 100 : 0;
            obj.Profit = ((obj.Cost / obj.Price) * 100).toFixed(2);
            obj.Discount = discount * currentCartItem.Qty,
                obj.Tax = tax * currentCartItem.Qty,
                obj.Total = ((obj.Price - discount + tax) * obj.Qty);

            return false;
        }
    });
    $.each(saleModel.pItems, function (index, obj) {
        if (obj.SaleItemID === currentCartItem.Id) {
            obj.UnitPrice = currentCartItem.Price;
            var discount = currentCartItem.AllowedDiscount === true ? obj.UnitPrice * currentCartItem.DiscountAllowed / 100 : 0;
            var tax = currentCartItem.IsTaxable === true ? obj.UnitPrice * currentCartItem.TaxRate / 100 : 0;
            obj.Discount = discount * obj.Quantity,
                obj.Tax = tax * obj.Quantity,
                obj.Total = ((obj.UnitPrice - discount + tax) * obj.Quantity);
            found = obj;
            return false;
        }
    });
    cart.dataSource.data(cartData);
    updateTotals();
}

function ResetCodeInput() {
    var codeInput = document.getElementById('code');
    if (codeInput) {
        codeInput.value = '';
    }
}
document.addEventListener("keydown", function (event) {
    // Check if Enter is pressed and the modal is visible
    if ((event.key === "Enter" || event.code === "NumpadEnter")) {
        event.preventDefault(); // Stop validation or form stuff
        if (document.getElementById("saleCreditAmountWindow")?.offsetParent !== null) {// means it's visible
            addSaleCreditAmount(); // 🚀 Just call it
        }
        else if (document.getElementById("serviceChargesWindow")?.offsetParent !== null) {// means it's visible
            addServiceCharges(); // 🚀 Just call it
        }
        else if (document.getElementById("firstNationsTaxDetailWindow")?.offsetParent !== null) {
            addFirstNationsTaxDetail();
        }
        else if (document.getElementById("IMEISNWindow")?.offsetParent !== null) {
            addIMEISN();
        }
    }
});

document.addEventListener("mousedown", function (e) {
    // Check if the click target is outside the #cartGrid
    if (!e.target.closest("#cartGrid") && deleteCurrentCartItem) {
        //var gridElement = document.getElementById("cartGrid");
        //if (gridElement && gridElement.kendoWidget) {
        //    var grid = gridElement.kendoWidget;
        //    grid.clearSelection(); // Kendo Grid method
        //} else if (window.kendo && kendo.jQuery) {
        //    var grid = kendo.jQuery("#cartGrid").data("kendoGrid");
        //    if (grid) {
        //        grid.clearSelection();
        //    }
        //}

        // Clear selected item reference
        var row = $("#cartGrid").find("tr[data-uid='" + deleteCurrentCartItem.uid + "']");
        deleteCurrentCartItem = null;
        $(row).removeClass('active')

    }
});




function printReceipt(sale) {
    if (!sale) return;

    window.LastInvoice = sale;
    const date = kendo.toString(kendo.parseDate(sale.SaleDate), 'MM/dd/yyyy');
    const time = kendo.toString(kendo.parseDate(sale.SaleDate), 'hh:mm tt');

    const docprint = window.open("about:blank", "_blank");
    docprint.document.open();

    // Using 'pt' or 'em' for font size is better for scaling across different DPI printers
    //const fsLarge = '12pt';
    const fsSmall = '10px';
    const fsLarge = '12px';
    const fsXLarge = '14px';
    const style = `
        <style>
            /* Reset for thermal printers */
            @page { 
                size: auto; 
                margin: 0mm; /* Printer drivers usually handle their own physical margins */
            }
            body { 
                font-family: sans-serif, monospace!important;
                margin-top: 10px;    /* Centers on wider paper */
                margin-bottom: 10px;    /* Centers on wider paper */
                margin-left: 20px;    /* Centers on wider paper */
                margin-right: 25px;
                padding-right:15px;
                padding: 0px;      /* Minimal padding for small rolls */
                font-size: ${fsXLarge}; 
                color: #000;
                line-height: 1.2;
            }
            
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .border-bottom { border-bottom: 1px dashed #000; padding-bottom: 5px; margin-bottom: 5px; }
            
            /* Flexbox for responsive side-by-side content */
            .flex-row { 
                display: flex; 
                justify-content: space-between; 
                align-items: flex-start;
                width: 100%; 
            }
            .flex-column { display: flex; flex-direction: column; align-items: center; }
            
            table { width: 100%; border-collapse: collapse; margin-top: 5px; }
            th { border-bottom: 1px solid #000; text-align: left; }
            td { padding: 3px 0; vertical-align: top; word-break: break-word; }
            
            .totals-section { margin-top: 10px; border-top: 1px solid #000; padding-top: 5px; }
            .footer { margin-top: 15px; text-align: center; }
            
            /* Ensure images/barcodes never overflow the paper width */
            img, canvas { max-width: 100% !important; height: auto !important; }
        </style>
    `;

    docprint.document.write('<html><head>' + style + '</head><body>');

    // Shop Info
    docprint.document.write(`<div class="flex-column center border-bottom">`);
    docprint.document.write(`<span class="bold">TechSource Canada</span>`);
    docprint.document.write('<span>1012 Gerrard Street East</span>');
    docprint.document.write('<span>Toronto, ON M4M 1Z3</span>');
    docprint.document.write('<span>416 466 1222</span>');
    //QR Code Was Here!
    docprint.document.write('</div>');




    // Sale Details
    docprint.document.write('<div class="border-bottom">');
    docprint.document.write(`<div class="flex-row"><span><b style="font-size:${fsLarge};">DATE:</b> ${date}</span><span>${time}</span></div>`);
    docprint.document.write(`<div><b style="font-size:${fsLarge};">RECIEPT NO:</b> ${sale.RefNO}</div>`);
    if (sale.HstNumber) docprint.document.write(`<div><b style="font-size:${fsLarge};">HST:</b> ${sale.HstNumber}</div>`);
    docprint.document.write(`<div><b style="font-size:${fsLarge};">SALE TYPE:</b> ${sale.SaleType}</div>`);
    docprint.document.write('</div>');

    // Customer Info
    //if (sale.CustomerName) {
    docprint.document.write('<div class="border-bottom">');
    docprint.document.write(`<div><b style="font-size:${fsLarge};">CUSTOMER:</b> ${sale.CustomerName || ''}</div>`);
    //if (sale.CustomerEmail)
    docprint.document.write(`<div><b style="font-size:${fsLarge};">EMAIL:</b> ${sale.CustomerEmail || ''}</div>`);
    //if (sale.CustomerPhone)
    docprint.document.write(`<div><b style="font-size:${fsLarge};">PHONE:</b> ${sale.CustomerPhone || ''}</div>`);
    docprint.document.write('</div>');
    //}

    // Items Table (Fluid columns)
    docprint.document.write(`<table style='font-size:${fsLarge}'>`);
    docprint.document.write(`<tr style="font-size:${fsSmall};">`);
    docprint.document.write(`<th style="width:10%;">QTY</th>`);
    docprint.document.write(`<th style="width:40%;text-align:center;">ITEM</th>`);
    docprint.document.write(`<th style="width:15%">Price</th>`);
    docprint.document.write(`<th style="width:15%">Tax</th>`);
    docprint.document.write(`<th style="width:20%; text-align:right">TOTAL</th></tr>`);
    docprint.document.write(`</tr>`);
    $.each(sale.SaleItems, function (index, obj) {
        docprint.document.write(`<tr style='font-size: ${fsXLarge};'>`);
        docprint.document.write(`<td>${obj.Qty}</td>`);
        docprint.document.write(`<td>${obj.Description}</td>`);
        docprint.document.write(`<td>$${obj.Price}</td>`);
        docprint.document.write(`<td>$${obj.Tax}</td>`);
        docprint.document.write(`<td style="text-align:right;">$${parseFloat(obj.Total).toFixed(2)}</td>`);
        docprint.document.write('</tr>');
    });
    docprint.document.write('</table>');

    // Totals Section
    docprint.document.write('<div class="totals-section">');
    docprint.document.write(`<div class="flex-row"><span style="font-size:${fsLarge};">SUB TOTAL:   </span><span>$${sale.SubTotal.toFixed(2)}</span></div>`);
    docprint.document.write(`<div class="flex-row"><span style="font-size:${fsLarge};">HST:         </span><span>$${sale.GST.toFixed(2)}</span></div>`);
    docprint.document.write(`<div class="flex-row"><span style="font-size:${fsLarge};">DISCOUNT:    </span><span>$${parseFloat(sale.Discount||0).toFixed(2)}</span></div>`);
    if (sale.Discount > 0) {
    }
    docprint.document.write(`<div class="flex-row bold" style="margin-top:2px;">
                                <span style="font-size:${fsLarge};">GRAND TOTAL:</span>
                                <span style="font-size:${fsXLarge};">$${sale.Total.toFixed(2)}</span>
                            </div>`);
    docprint.document.write('</div>');

    generateBarcode("#barcode", sale.RefNO);
    var barcode = $("#barcode")[0];
    // Footer
    docprint.document.write(`<div class="footer" style="font-size:${fsXLarge};">`);
    docprint.document.write(`ALL SALES ARE FINAL<br>30 DAYS EXCHANGE FOR STORE CREDIT<br>`);
    docprint.document.write(`ON DEFECTIVE ITEMS ONLY<br>WITH ORIGINAL PACKAGING<br>`);
    docprint.document.write(`<br><strong style="font-size:${fsSmall};">Thank you for your business!</strong>`);

    docprint.document.write('</div>');

    // Barcode (Responsive canvas)
    docprint.document.write("<div id='barcode-element' class='center' style='margin-top:10px;'></div>");



    var qrCodeEl = docprint.document.getElementById('barcode-element');
    qrCodeEl.appendChild(barcode);

    var canvas = document.createElement("canvas");
    canvas.id = 'barcode';
    document.getElementById("barcode-container").appendChild(canvas);
    if (sale.QrCodeStr) {
        docprint.document.write(`<div class="center">`);
        docprint.document.write(`<img src="data:image/png;base64,${sale.QrCodeStr}" style="width:150px; margin:5px 0;">`);
        docprint.document.write(`<div style="font-size:${fsSmall};">REVIEW US HERE</div>`);
        docprint.document.write(`</div>`);
    }
    docprint.document.write('</body></html>');
    docprint.document.close();

    setTimeout(function () {
        docprint.print();
        docprint.close();
    }, 300);
}