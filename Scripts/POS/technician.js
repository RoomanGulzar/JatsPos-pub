
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

/****************** Main Content ****************/

function HomeScreen() {
    keyPressBeep();
    $(".not_main_screen").slideUp();
    $("#main_screen").slideDown();
}

function UpdatePartsScreen() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Technician/Parts',
        async: true,
        success: function (data) {
            $("#parts_screen").html("");
            $("#parts_screen").html(data);
            switchUpdatePartsScreen(true);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function switchUpdatePartsScreen(showUpdateStock) {
    keyPressBeep();
    if (showUpdateStock) {
        $(".not_main_screen").slideUp();
        $("#parts_screen").slideDown();
        $("#main_screen").slideUp();
    } else {
        $("#parts_screen").slideUp();
        $("#main_screen").slideDown();
    }
}

function AddNewPartScreen() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Technician/AddNewPart',
        async: true,
        success: function (data) {
            $("#add_new_part_screen").html("");
            $("#add_new_part_screen").html(data);
            switchAddNewPartScreen(true);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function switchAddNewPartScreen(showUpdateStock) {
    keyPressBeep();
    if (showUpdateStock) {
        $(".not_main_screen").slideUp();
        $("#add_new_part_screen").slideDown();
        $("#main_screen").slideUp();
    } else {
        $("#add_new_part_screen").slideUp();
        $("#main_screen").slideDown();
    }
}

function UpdatePartScreen(id) {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Technician/UpdatePart?id=' + id,
        async: true,
        success: function (data) {
            $("#update_part_screen").html("");
            $("#update_part_screen").html(data);
            switchUpdatePartScreen(true);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function switchUpdatePartScreen(showUpdateStock) {
    keyPressBeep();
    if (showUpdateStock) {
        $(".not_main_screen").slideUp();
        $("#update_part_screen").slideDown();
        $("#main_screen").slideUp();
    } else {
        $("#update_part_screen").slideUp();
        $("#main_screen").slideDown();
    }
}

function UpdateStockScreen() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Technician/UpdateStock',
        async: true,
        success: function (data) {
            $("#updatestock_screen").html("");
            $("#updatestock_screen").html(data);
            switchUpdateStockScreen(true);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function switchUpdateStockScreen(showUpdateStock) {
    keyPressBeep();
    if (showUpdateStock) {
        $(".not_main_screen").slideUp();
        $("#updatestock_screen").slideDown();
        $("#main_screen").slideUp();
    } else {
        $("#updatestock_screen").slideUp();
        $("#main_screen").slideDown();
    }
}

function UpdateStockHistoryScreen() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Technician/UpdateStockHistory',
        async: true,
        success: function (data) {
            $("#updatestockhistory_screen").html("");
            $("#updatestockhistory_screen").html(data);
            switchUpdateStockHistoryScreen(true);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function switchUpdateStockHistoryScreen(showUpdateStock) {
    keyPressBeep();
    if (showUpdateStock) {
        $(".not_main_screen").slideUp();
        $("#updatestockhistory_screen").slideDown();
        $("#main_screen").slideUp();
    } else {
        $("#updatestockhistory_screen").slideUp();
        $("#main_screen").slideDown();
    }
}

function UpdateStockModifyScreen(id) {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Technician/UpdateStockModify?id=' + id,
        async: true,
        success: function (data) {
            $("#updatestock_screen").html("");
            $("#updatestock_screen").html(data);
            switchUpdateStockModifyScreen(true);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function switchUpdateStockModifyScreen(showUpdateStock) {
    keyPressBeep();
    if (showUpdateStock) {
        $(".not_main_screen").slideUp();
        $("#updatestock_screen").slideDown();
        $("#updatestockhistory_screen").slideUp();
    } else {
        $("#updatestock_screen").slideUp();
        UpdateStockHistoryScreen();
    }
}

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
function searchQueryChange(e) {
    itemSearchKeypadVal = e.value;
    itemSearch = e.value;
    if (itemSearch) {
        var searchGrid = $("#searchGrid").data("kendoGrid");
        if (searchGrid) {
            showSearchGridContent(true);
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
var itemSearch = "";

var cartData = [];
var currentCartItem = null;
var cartPartData = [];
var currentCartPart = null;
var repairOrderModel = {
    Id: null,
    Services: [],
    Items: [],
    SubTotal: 0,
    Total: 0
};

function increaseQty() {
    keyPressBeep();
    if (currentCartPart.ImeiId !== null
        && currentCartPart.ImeiId !== undefined) {
        return;
    }

    var cart = $("#cartPartGrid").data("kendoGrid");
    $.each(cartPartData, function (index, obj) {
        if (obj.Id === currentCartPart.Id) {
            obj.Qty += 1;
            obj.Total = obj.Price * obj.Qty;
            return false;
        }
    });
    $.each(repairOrderModel.Items, function (index, obj) {
        if (obj.Id === currentCartPart.Id) {
            obj.Quantity += 1;
            obj.Total = obj.UnitPrice * obj.Quantity;
            found = obj;
            return false;
        }
    });
    currentCartPart.Qty += 1;
    $(".currentPart_Qty").html(currentCartItem.Qty);
    cart.dataSource.data(cartPartData);
    updateTotals();

}

function decreaseQty() {
    keyPressBeep();

    if (currentCartPart.ImeiId !== null
        && currentCartPart.ImeiId !== undefined) {
        return;
    }

    var cart = $("#cartPartGrid").data("kendoGrid");
    $.each(cartPartData, function (index, obj) {
        if (obj.Id === currentCartPart.Id && obj.Qty > 1) {
            var discount = obj.AllowedDiscount === true ? obj.Price * obj.DiscountAllowed / 100 : 0;
            var tax = obj.IsTaxable === true ? obj.Price * obj.TaxRate / 100 : 0;
            obj.Qty -= 1;
            obj.Discount = discount * obj.Qty,
                obj.Tax = tax * obj.Qty,
                obj.Total = ((obj.Price - discount + tax) * obj.Qty);
            return false;
        }
    });
    $.each(repairOrderModel.Items, function (index, obj) {
        if (obj.Id === currentCartItem.Id && obj.Quantity > 1) {
            var discount = currentCartPart.AllowedDiscount === true ? obj.UnitPrice * currentCarPart.DiscountAllowed / 100 : 0;
            var tax = currentCartPart.IsTaxable === true ? obj.UnitPrice * currentCartPart.TaxRate / 100 : 0;
            obj.Quantity -= 1;
            obj.Discount = discount * obj.Quantity,
                obj.Tax = tax * obj.Quantity,
                obj.Total = ((obj.UnitPrice + tax - discount) * obj.Quantity);
            obj.Total = obj.UnitPrice * obj.Quantity;
            return false;
        }
    });

    if (currentCartPart.Qty > 1) {
        currentCartPart.Qty -= 1;
        $(".currentPart_Qty").html(currentCartPart.Qty);
    }
    cart.dataSource.data(cartPartData);
    updateTotals();

}
var itemQtyKeppadVal = "";
function setItemQuantity(value) {

    if (currentCartPart.ImeiId !== null
        && currentCartPart.ImeiId !== undefined) {
        return;
    }

    if (value === 'clear') {
        itemQtyKeppadVal = "";
    } else {
        itemQtyKeppadVal += value;
    }

    currentCartPart.Qty = itemQtyKeppadVal ? parseFloat(itemQtyKeppadVal) : 1;
    if (currentCartPart.Qty <= 0) {
        currentCartPart.Qty = 1;
    }
    $(".currentPart_Qty").html(currentCartPart.Qty);

    keyPressBeep();
    var cart = $("#cartPartGrid").data("kendoGrid");
    $.each(cartPartData, function (index, obj) {
        if (obj.Id === currentCartPart.Id) {
            var discount = obj.AllowedDiscount === true ? obj.Price * obj.DiscountAllowed / 100 : 0;
            var tax = obj.IsTaxable === true ? obj.Price * obj.TaxRate / 100 : 0;
            obj.Qty = currentCartPart.Qty;
            obj.Discount = discount * currentCartPart.Qty,
                obj.Tax = tax * currentCartPart.Qty,
                obj.Total = ((obj.Price - discount + tax) * obj.Qty);
            return false;
        }
    });
    $.each(repairOrderModel.Items, function (index, obj) {
        if (obj.Id === currentCartPart.Id) {
            var discount = currentCartPart.AllowedDiscount === true ? obj.UnitPrice * currentCartPart.DiscountAllowed / 100 : 0;
            var tax = currentCartPart.IsTaxable === true ? obj.UnitPrice * currentCartPart.TaxRate / 100 : 0;
            obj.Quantity = currentCartPart.Qty;
            obj.Discount = discount * obj.Quantity,
                obj.Tax = tax * obj.Quantity,
                obj.Total = ((obj.UnitPrice + tax - discount) * obj.Quantity);
            found = obj;
            return false;
        }
    });
    cart.dataSource.data(cartPartData);
    updateTotals();

}

var itemPriceKeppadVal = "";
function setItemPrice(value) {

    if (value === 'clear') {
        itemPriceKeppadVal = "";
    } else {
        itemPriceKeppadVal += value;
    }

    currentCartItem.Price = itemPriceKeppadVal ? parseFloat(itemPriceKeppadVal) : 1;
    if (currentCartItem.Price < 0) {
        currentCartItem.Price = 0;
    }
    $(".currentItem_Price").html("$" + currentCartItem.Price);

    keyPressBeep();
    var cart = $("#cartGrid").data("kendoGrid");
    $.each(cartData, function (index, obj) {
        if (obj.Id === currentCartItem.Id) {
            obj.Price = currentCartItem.Price;
            var discount = obj.AllowedDiscount === true ? obj.Price * obj.DiscountAllowed / 100 : 0;
            var tax = obj.IsTaxable === true ? obj.Price * obj.TaxRate / 100 : 0;
            obj.Profit = (obj.Cost / obj.Price) * 100;
            obj.Discount = discount,
                obj.Tax = tax,
                obj.Total = ((obj.Price - discount + tax));
            return false;
        }
    });
    $.each(repairOrderModel.Services, function (index, obj) {
        if (obj.Id === currentCartItem.Id) {
            obj.UnitPrice = currentCartItem.Price;
            var discount = currentCartItem.AllowedDiscount === true ? obj.UnitPrice * currentCartItem.DiscountAllowed / 100 : 0;
            var tax = currentCartItem.IsTaxable === true ? obj.UnitPrice * currentCartItem.TaxRate / 100 : 0;
            obj.Discount = discount,
                obj.Tax = tax,
                obj.Total = ((obj.UnitPrice + tax - discount));
            found = obj;
            return false;
        }
    });
    cart.dataSource.data(cartData);
    updateTotals();

}
function removeCartItem() {
    keyPressBeep();
    var cart = $("#cartGrid").data("kendoGrid");
    cartData = $.grep(cartData, function (n, i) {
        return n.Id !== currentCartItem.Id;
    });
    repairOrderModel.Services = $.grep(repairOrderModel.Services, function (n, i) {
        return n.Id !== currentCartItem.Id;
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
function setPartPrice(value) {
    if (value === 'clear') {
        itemPriceKeppadVal = "";
    } else {
        itemPriceKeppadVal += value;
    }

    currentCartPart.Price = itemPriceKeppadVal ? parseFloat(itemPriceKeppadVal) : 1;
    if (currentCartPart.Price < 0) {
        currentCartPart.Price = 0;
    }
    $(".currentPart_Price").html("$" + currentCartPart.Price);

    keyPressBeep();
    var cart = $("#cartPartGrid").data("kendoGrid");
    $.each(cartPartData, function (index, obj) {
        if (obj.Id === currentCartPart.Id) {
            obj.Price = currentCartPart.Price;
            var discount = obj.AllowedDiscount === true ? obj.Price * obj.DiscountAllowed / 100 : 0;
            var tax = obj.IsTaxable === true ? obj.Price * obj.TaxRate / 100 : 0;
            obj.Profit = (obj.Cost / obj.Price) * 100;
            obj.Discount = discount,
                obj.Tax = tax,
                obj.Total = ((obj.Price - discount + tax));
            return false;
        }
    });
    $.each(repairOrderModel.Items, function (index, obj) {
        if (obj.Id === currentCartPart.Id) {
            obj.UnitPrice = currentCartPart.Price;
            var discount = currentCartPart.AllowedDiscount === true ? obj.UnitPrice * currentCartPart.DiscountAllowed / 100 : 0;
            var tax = currentCartPart.IsTaxable === true ? obj.UnitPrice * currentCartPart.TaxRate / 100 : 0;
            obj.Discount = discount,
                obj.Tax = tax,
                obj.Total = ((obj.UnitPrice + tax - discount));
            found = obj;
            return false;
        }
    });
    cart.dataSource.data(cartPartData);
    updateTotals();

}
function removeCartPart() {
    keyPressBeep();
    var cart = $("#cartPartGrid").data("kendoGrid");
    cartPartData = $.grep(cartPartData, function (n, i) {
        return n.Id !== currentCartPart.Id;
    });
    repairOrderModel.Items = $.grep(repairOrderModel.Items, function (n, i) {
        return n.Id !== currentCartPart.Id;
    });
    cart.dataSource.data(cartPartData);
    updateTotals();
    closeCartPartActionWindow();
}

function closeCartPartActionWindow() {
    keyPressBeep();
    var win = $("#cartPartActionWindow").data("kendoWindow");
    win.close();
    currentCartPart = null;
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
        url: '/RepairOrder/SearchByItemNo?id=' + barcode,
        async: true,
        success: function (item) {

            unblockUI();
            if (!item) {
                alert("Service not found");
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
        if (item.ServiceID !== null && item.ServiceID !== undefined
                ? obj.ServiceId === item.ServiceID : false
        ) {
            foundItem = obj;
            return false;
        }
    });
    if (!foundItem) {
        var discount = item.AllowedDiscount === true ? (item.RepairOrderPrice * (item.Discount / 100)) : 0;
        var tax = item.IsTaxable === true ? (item.RepairOrderPrice * (item.TaxRate / 100)) : 0;
        repairOrderModel.Services.push({
            Id: id,
            Description: item.Name,
            UnitPrice: item.SalePrice,
            Discount: discount,
            Tax: tax,
            Total: item.SalePrice + tax - discount,
            ServiceId: item.ServiceID,
            RepairOrderId: repairOrderModel.RepairOrderId
        });
        cartData.push({
            Id: id,
            Index: count + 1,
            ServiceId: item.ServiceID,
            Description: item.Name,
            Price: item.SalePrice,
            Cost: item.PurchaseCost,
            Profit: ((item.SalePrice - item.PurchaseCost) / item.SalePrice) * 100,
            AllowedDiscount: item.AllowedDiscount,
            DiscountAllowed: item.Discount,
            Discount: discount,
            IsTaxable: item.IsTaxable,
            TaxRate: item.TaxRate,
            Tax: tax,
            Total: (item.SalePrice - discount + tax)
        });
    }
    updateTotals();
    cart.dataSource.data(cartData);
}

function updateCartPart(cartPart, item) {
    var foundItem = null;
    debugger;
    var count = cartPartData.length;
    var id = kendo.guid();

    $.each(cartPartData, function (index, obj) {
        if (obj.FkImeiID == null) {
            if ((item.ItemID !== null ?
                (obj.FKItemID === item.ItemID && obj.FkUnitID === item.FkUnitID)
                : (item.ServiceID !== null && item.ServiceID !== undefined
                    ? obj.FKServiceID === item.ServiceID : false)
            )) {
                var discount = obj.AllowedDiscount === true ? obj.Price * obj.DiscountAllowed / 100 : 0;
                var tax = obj.IsTaxable === true ? obj.Price * obj.TaxRate / 100 : 0;
                obj.Qty += 1;
                obj.Discount = discount * obj.Qty,
                    obj.Tax = tax * obj.Qty,
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
        repairOrderModel.Items.push({
            Id: id,
            Quantity: 1,
            Description: item.Name,
            UnitPrice: item.SalePrice,
            Discount: discount,
            Tax: tax,
            Total: item.SalePrice + tax - discount,
            ItemId: item.ItemID,
            ImeiId: item.ImeiId,
            FkUnitID: item.FkUnitID,
            RepairOrderId: repairOrderModel.RepairOrderId
        });
        cartPartData.push({
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
            Profit: ((item.SalePrice - item.PurchaseCost) / item.SalePrice) * 100,
            AllowedDiscount: item.AllowedDiscount,
            DiscountAllowed: item.Discount,
            Discount: discount,
            IsTaxable: item.IsTaxable,
            TaxRate: item.TaxRate,
            Tax: tax,
            Total: (item.SalePrice - discount + tax)
        });
    } else {
        if (foundItem.FkImeiID === null) {
            $.each(repairOrderModel.Items, function (index, obj) {
                if ((item.ItemID !== null ?
                    (obj.ItemId === item.ItemID && obj.FkUnitID === item.FkUnitID)
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
    cartPart.dataSource.data(cartPartData);
}

function updateTotals() {
    repairOrderModel.SubTotal = 0;
    repairOrderModel.DiscountAmount = 0;
    repairOrderModel.TaxAmount = 0;
    repairOrderModel.Total = 0;
    $.each(repairOrderModel.Items, function (index, obj) {
        repairOrderModel.DiscountAmount += obj.Discount;
        repairOrderModel.TaxAmount += obj.Tax;
        repairOrderModel.SubTotal += obj.UnitPrice * obj.Quantity;
    });
    $.each(repairOrderModel.Services, function (index, obj) {
        //repairOrderModel.DiscountAmount += obj.Discount;
        repairOrderModel.TaxAmount += obj.Tax;
        repairOrderModel.SubTotal += obj.UnitPrice;
    });

    //repairOrderModel.DiscountAmount = repairOrderModel.SubTotal * (repairOrderModel.Discount / 100);

    repairOrderModel.Total = repairOrderModel.SubTotal + repairOrderModel.TaxAmount;

    var subTotal = $("#repairOrderModel_SubTotal");
    subTotal[0].innerText = '$' + repairOrderModel.SubTotal.toFixed(2);

    var gst = $("#repairOrderModel_GST");
    gst[0].innerText = '$' + repairOrderModel.TaxAmount.toFixed(2);

    //$(".repairOrderModel_Discount").html(repairOrderModel.Discount.toFixed(2) + '%');

    var total = $(".repairOrderModel_Total");
    total.html('$' + repairOrderModel.Total.toFixed(2));

}

$("#discountWindow").kendoWindow({
    width: "500px",
    title: false,
    visible: false,
    modal: true
});

function addDiscount() {
    keyPressBeep();
    if (repairOrderModel.Discount > 0 || repairOrderModel.Total > 0) {
        $(".repairOrderModel_Discount").html(repairOrderModel.Discount + "%");
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

    repairOrderModel.Discount = dicountkeypadVal ? parseFloat(dicountkeypadVal) : 0;
    updateTotals();
}

function closeDiscountWindow() {
    keyPressBeep();
    if (repairOrderModel.Total >= 0) {
        var win = $("#discountWindow").data("kendoWindow");
        win.close();
    }
}
function cancelDiscount(value) {
    keyPressBeep();
    dicountkeypadVal = "";

    repairOrderModel.Discount = 0;
    updateTotals();
    closeDiscountWindow();
}

function updateRepairOrder() {
    keyPressBeep();

    if (repairOrderModel.Services.length <= 0) {
        return $().toastmessage('showToast', {
            text: "Please add services",
            sticky: false,
            position: 'bottom-right',
            type: 'error'
        });
    }

    blockUI();

    $.ajax({
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        url: '/Technician/UpdateRepairOrder',
        data: JSON.stringify({ RepairOrder: repairOrderModel }),
        async: true,
        success: function (msg) {
            if (msg.saleid && msg.saleid !== "00000000-0000-0000-0000-000000000000") {
                //$('#repairOrderid').val(msg.repairOrderid);
                //closePaymentWindow();
                UpdateScreen(msg.saleid);
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

function completeRepairOrder() {
    keyPressBeep();

    if (!confirm("Are you sure you want to complete this order?")) {
        return;
    }

    blockUI();

    $.ajax({
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        url: '/Technician/CompleteRepairOrder',
        data: JSON.stringify({ RepairOrder: repairOrderModel }),
        async: true,
        success: function (msg) {
            if (msg.saleid && msg.saleid !== "00000000-0000-0000-0000-000000000000") {
                //$('#repairOrderid').val(msg.repairOrderid);
                //closePaymentWindow();
                window.location.href = '/technician';
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

function cancelRepairOrder(repairOrderID) {
    debugger
    keyPressBeep();
    var messge = prompt("You are going to cancel this repairOrder, please mention the reason", "");
    if (!messge) {
        return false;
    }
    var cancelModel = { RepairOrderID: repairOrderID, Comments: messge };
    blockUI();
    $.ajax({
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        url: '/Pos/CancelRepairOrder',
        data: JSON.stringify({ RepairOrder: cancelModel }),
        async: true,
        success: function (msg) {
            unblockUI();
            successToast();
            RepairOrdersScreen();
            getCashCounter();
            getTotalRepairOrder();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function UpdateScreen(id) {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Technician/Update?id=' + id,
        async: true,
        success: function (data) {
            $("#update_screen").html("");
            $("#update_screen").html(data);
            switchUpdateScreen(true);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function switchUpdateScreen(showSales) {
    keyPressBeep();
    if (showSales) {
        $(".not_main_screen").slideUp();
        $("#update_screen").slideDown();
        $("#main_screen").slideUp();
    } else {
        $("#update_screen").slideUp();
        $("#main_screen").slideDown();
    }
}

function reprintInvoice(s) {
    keyPressBeep();
    var repairOrder = JSON.parse(s);
    printReceipt(repairOrder);
}
function printReceipt(repairOrder) {

    if (!repairOrder) {
        return;
    }
    var customer = {
        CustomerName: repairOrder.CustomerName, CustomerVat: repairOrder.CustomerVat
    };
    var sr = repairOrder.RefNO;
    var date = dateFormat(kendo.parseDate(repairOrder.RepairOrderDate));
    var sn = 0;
    var sno = 0;
    var docprint = window.open("about:blank", "_blank");
    docprint.document.open();
    docprint.document.write('<html><head><title></title>');
    docprint.document.write('<style>span { margin:3px; } @media all {');
    docprint.document.write('.page-break	{ display: none; }}');
    docprint.document.write('@media print {');
    docprint.document.write('.page-break	{ display: block; page-break-before: always; }}</style>');
    docprint.document.write('</head><body style="width:275px;font-weight:bold;font-size:14px;">');
    // page 1
    docprint.document.write('<div class="page-break" style="display:block;">');
    //docprint.document.write('<div class="col-lg-12" style="text-align:center"><img src="/Content/Images/event_icon.png" /></div>');
    docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;font-weight:bold;font-size:20px;'>Tech City Electronics</div>");
    docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;'></div>");
    docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;'> Bill No.: " + sr + "</div>");
    if (customer.CustomerName) {
        docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;'>"
            + customer.CustomerName + " Customer Name</div>");
    }
    docprint.document.write("<br/><div style='float:left;width:100%;'>" + date + "</div>");

    docprint.document.write("<table style='float:left;text-align:center;width:100%;font-weight:bold;'>"
        + "<tr>"
        + "<th>" + "SN." + "</th>"
        + "<th>" + "Item" + "</th>"
        + "<th>" + "Qty." + "</th>"
        + "<th>" + "Price" + "</th>"
        + "<th>" + "Total" + "</th>"
        + "</tr>");
    $.each(repairOrder.RepairOrderItems, function (index, obj) {
        var itemno = $(this).find(".item-search").val();
        sno += sn + 1;
        var desc = obj.Description;
        var qty = obj.Qty;
        var price = obj.Price;
        var total = obj.Total;
        //"</span><span style='font-weight:bold;float:left;'>" + itemno +
        docprint.document.write("<tr>"
            + "<td>" + sno + "</td>"
            + "<td>" + desc + "</td>"
            + "<td>" + qty + "</td>"
            + "<td>" + price + "</td>"
            + "<td>" + parseFloat(total).toFixed(2) + "</td>"
            + "</tr>");

    });
    docprint.document.write("</table>");
    var gTotal = repairOrder.Total;
    var subTotal = repairOrder.SubTotal;
    var gst = repairOrder.GST;
    var disc = repairOrder.Discount;
    var payment = repairOrder.Received;
    var returned = -(repairOrder.Due);
    if (disc == "") {
        disc = 0;
    }

    docprint.document.write("<br/><br/><br/><br/><div style='float:left;width:100%;text-align:right;font-size:medium;margin-top:10px;'>Sub Total: " + subTotal + "</div>");
    //docprint.document.write("<div style='float:left;width:100%;text-align:right;font-size:medium'>ضريبة: " + gst + "</div>");
    docprint.document.write("<div style='float:left;width:100%;text-align:right;font-size:medium'>Discount: " + disc + "</div>");
    docprint.document.write("<div style='float:left;width:100%;text-align:right;font-size:medium'>Grand Total: " + gTotal + "</div>");
    docprint.document.write("<br/><div style='float:left;width:100%;text-align:right;font-size:medium'>Payment: " + payment + "</div>");
    docprint.document.write("<div style='float:left;width:100%;text-align:right;font-size:medium'>Returned: " + returned + "</div>");
    docprint.document.write("<br/><br/><div style='float:left;width:100%;text-align:center;font-size:small'>Thank you for shopping</div>");
    //docprint.document.write("<br/><br/><div style='float:left;width:100%;text-align:center;font-size:small'>Powered By: <b> https://www.rixpos.com/ </b> </div>");
    docprint.document.write('</div>');

    docprint.document.close();
    docprint.print();


    docprint.close();
}
function printTag(repairOrder) {

    if (!repairOrder) {
        return;
    }
    var customer = {
        CustomerName: repairOrder.CustomerName, CustomerVat: repairOrder.CustomerVat
    };
    var sr = repairOrder.RefNO;
    var date = dateFormat(kendo.parseDate(repairOrder.RepairOrderDate));
    var sn = 0;
    var sno = 0;
    var docprint = window.open("about:blank", "_blank");
    docprint.document.open();
    docprint.document.write('<html><head><title></title>');
    docprint.document.write('<style>span { margin:3px; } @media all {');
    docprint.document.write('.page-break	{ display: none; }}');
    docprint.document.write('@media print {');
    docprint.document.write('.page-break	{ display: block; page-break-before: always; }}</style>');
    docprint.document.write('</head><body style="width:302px;font-weight:bold;font-size:14px;">');
    // page 1
    docprint.document.write('<div class="page-break" style="display:block;">');
    //docprint.document.write('<div class="col-lg-12" style="text-align:center"><img src="/Content/Images/event_icon.png" /></div>');
    docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;font-weight:bold;font-size:20px;'>Tech City Electronics</div>");
    docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;'></div>");
    docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;'> Bill No.: " + sr + "</div>");
    if (customer.CustomerName) {
        docprint.document.write("<br/><div style='float:left;width:100%;text-align:center;'>"
            + customer.CustomerName + " Customer Name</div>");
    }
    docprint.document.write("<br/><div style='float:left;width:100%;'>" + date + "</div>");

    docprint.document.write("<br/><br/><br/><br/><div style='float:left;width:100%;text-align:right;font-size:medium;margin-top:10px;'>Sub Total: " + subTotal + "</div>");
    //docprint.document.write("<div style='float:left;width:100%;text-align:right;font-size:medium'>ضريبة: " + gst + "</div>");
    docprint.document.write("<div style='float:left;width:100%;text-align:right;font-size:medium'>Discount: " + disc + "</div>");
    docprint.document.write("<div style='float:left;width:100%;text-align:right;font-size:medium'>Grand Total: " + gTotal + "</div>");
    docprint.document.write("<br/><div style='float:left;width:100%;text-align:right;font-size:medium'>Payment: " + payment + "</div>");
    docprint.document.write("<div style='float:left;width:100%;text-align:right;font-size:medium'>Returned: " + returned + "</div>");
    docprint.document.write("<br/><br/><div style='float:left;width:100%;text-align:center;font-size:small'>Thank you for shopping</div>");
    //docprint.document.write("<br/><br/><div style='float:left;width:100%;text-align:center;font-size:small'>Powered By: <b> https://www.rixpos.com/ </b> </div>");
    docprint.document.write('</div>');

    docprint.document.close();
    docprint.print();


    docprint.close();
}

function postPrint() {
    try {
        window.external.OpenDrawer();
    } catch (e) {
        console.debug(e.message);
    }
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

function refreshSession() {
    $.ajax({
        type: "get",
        contentType: 'application/json; charset=utf-8',
        url: '/Pos/Refresh',
        async: true,
        success: function (msg) {
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




var xhr;
var select_saleitemunit = [];
var saleItemUnitgroupID = null;
function getItemDetailByNumber(ref, row) {
    var itemno = $(ref).val().trim();
    if (!itemno) {
        return false;
    }
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "json",
        url: '/Sale/SearchByItemNo?id=' + itemno + '&&isPart=true',
        async: true,
        success: function (data) {

            unblockUI();
            if (!data) {
                $(ref).parent().parent().find(".sale-items").focus();
                $(ref).parent().parent().find(".sale-items").val("");
                $(ref).parent().parent().find(".item-id-hdn").val("");
                $(ref).parent().parent().find(".sale-item-quantity").val("");
                $(ref).parent().parent().find(".sale-item-base-price").val("");
                $(ref).parent().parent().find(".sale-item-price").val("");
                $(ref).parent().parent().find(".sale-item-total").val("");
                $(ref).parent().parent().find(".image-col").html("");
                return $().toastmessage('showToast', {
                    text: 'Not Found. Try Product Search',
                    sticky: false,
                    position: 'bottom-right',
                    type: 'error'

                });
            }

            if (select_saleitemunit) {
                saleItemUnitgroupID = data.FkUnitGroupID;
                select_saleitemunit[row - 1].dataSource.read();
            }
            $(ref).parent().parent().find(".sale-items").val(data.Name + "" + data.Description);
            $(ref).parent().parent().find(".item-id-hdn").val(data.ItemID);
            $(ref).parent().parent().find(".sale-item-base-price").val(data.SalePrice);
            $(ref).parent().parent().find(".sale-item-price").val(data.SalePrice);
            $(ref).parent().parent().find(".sale-item-quantity").val(1);
            $(ref).parent().parent().find(".sale-item-total").val(data.SalePrice);
            $(ref).parent().parent().find(".sale-item-quantity").focus();
            //$(ref).parent().parent().find(".image-col").html("<a href='#' onclick='openSaleImageModal(this)'><i class='fa fa-file-image-o fa-fw'></i></a> <input type='hidden' class='img-src' value='" + data.Image + "'/><input type='hidden' class='img-src1' value='" + data.Image1 + "'/>");


            var tabl = '<table  style="font-size: 14px;"><thead><tr style="background-color:#B8D91A;"><th>Name</th><th>Price</th></tr></thead><tbody>';
            tabl += '<tr style="background-color:#97DAF5;"><td >Sale Price</td><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">' + data.SalePrice + '</td></tr>';
            tabl += '<tr style="background-color:#B8D91A;"><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">Whole Sale Price</td><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">' + data.WholeSalePrice + '</td></tr>';
            tabl += '<tr style="background-color:#f25c57;"><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">Order Price</td><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">' + data.OrderPrice + '</td></tr>';
            tabl += '<tr style="background-color:#5cb85c;"><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">Special Price</td><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">' + data.SpecialSalePrice + '</td></tr>';
            tabl += '<tr style="background-color:#97DAF5;"><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">Cost</td><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">' + data.PurchaseCost + '</td></tr>';
            tabl += '<tr style="background-color:#B8D91A;"><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">Previous Prices</td><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">' + data.PreviousPrices + '</td></tr>';
            if ($("#Sale_FKCustomerID").val()) {
                $.ajax({
                    type: "GET",
                    contentType: "html",
                    url: '/Sale/getCustomerPrices?item=' + data.ItemID + '&customer=' + $("#Sale_FKCustomerID").val(),
                    async: false,
                    success: function (datap) {
                        tabl += '<tr  style="background-color:#97DAF5;"><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">Customer Prices</td><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">' + datap + '</td></tr>';
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        handleErrors(textStatus);
                    }
                });
            }


            tabl += "</tbody></table>";
            $(ref).parent().parent().find(".prices").html("<a href='#' onclick='openPricesModal(this)'><i class='fa fa-usd fa-fw'></i></a> <input type='hidden' class='hdnPrices' value='" + tabl + "'/>");

        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function setSItemTotalSt(ref) {
    $(".btn").prop("disabled", false);
    var qty = $($(ref).parent().parent().find(".sale-item-unit")[1]);
    var qtyDropDown = qty.data("kendoDropDownList");
    //var value = qtyDropDown.value();
    var unitQty = qtyDropDown ? qtyDropDown.dataItem() : null;
    var unit = $(ref).parent().parent().find(".sale-item-quantity").val();
    var price = $(ref).parent().parent().find(".sale-item-price").val() * (unitQty && unitQty.Qty ? unitQty.Qty : 1);
    if (parseFloat(unit) == 0) {
        $(ref).addClass("input-validation-error");
        $(".btn").prop("disabled", true);
        $(ref).focus();
        return $().toastmessage('showToast', {
            text: "Quantity must be greater than zero",
            sticky: false,
            position: 'bottom-right',
            type: 'warning'

        });
    }
    if (unit != "" && price != "") {
        $(ref).parent().parent().find(".sale-item-total").val(parseFloat(unit) * parseFloat(price));
        calculateStockTotal()
    }
}
function calculateStockTotal() {
    var itemTotal = 0;
    $(".sale-item-total").each(function () {
        var val = this.value;
        if (val) {
            itemTotal = itemTotal + parseFloat(val);
        }
    });
    $("#stockTotal").val(itemTotal);

    var itemTotalQty = [];
    $(".sale-item-unit").each(function (index, item) {
        if (((index + 1) % 2) === 0) {
            var qty = $(item);
            var qtyDropDown = qty.data("kendoDropDownList");
            //var value = qtyDropDown.value();
            var unitQty = qtyDropDown ? qtyDropDown.dataItem() : null;
            itemTotalQty.push(unitQty && unitQty.Qty ? unitQty.Qty : 1);
        }

    });
    var itemTotal1 = 0;

    $(".sale-item-quantity").each(function (index, item) {
        var val = this.value;
        if (val) {
            itemTotal1 = itemTotal1 + (parseFloat(val) * itemTotalQty[index]);
        }
    });
    $("#stockQuantity").val(itemTotal1);
}

function addNewRowStock() {
    keyPressBeep();
    var rowCount = parseInt($('#stock-items >tbody >tr').length);
    var row = "<tr>";
    row += "<td>" + (rowCount + 1) + "</td>";
    row += '<td><input name="Stock.uItem[' + rowCount + '].ItemNo" type="text" class="form-control item-search" onchange="getItemDetailByNumber(this, ' + (rowCount + 1) + ')" /></td>';
    row += "<td> <input id='TR-item-" + rowCount + "' name='Stock.uItem[" + rowCount + "].Desc' class='sale-items form-control' /><input type='hidden' class='item-id-hdn' name='Stock.uItem[" + rowCount + "].ItemID' /></td>";
    row += "<td><input type='number' class='form-control sale-item-quantity' onblur='setSItemTotalSt(this)' name='Stock.uItem[" + rowCount + "].Quantity' required/></td>";
    row += "<td><div id='Stock_uItem" + rowCount + "_FkUnitID' class='form-control sale-item-unit'></div></td>";
    row += '<td><input type="number" class="form-control sale-item-price"  name="Stock.uItem[' + rowCount + '].SalePrice" readonly /></td>';
    row += "<td><input type='number' class='form-control sale-item-total'  name='Stock.uItem[" + rowCount + "].Total' readonly/></td>";
    row += "<td><a href='#' onclick='removeStockSale(this)'><i class='fa fa-trash fa-fw'></i></a></td></tr>";
    $('#stock-items >tbody').append(row);
    applyAutoComplete("TR-item-" + rowCount);

    saleItemUnitgroupID = null;
    var dropDiv = $("#Stock_uItem" + rowCount + "_FkUnitID");
    dropDiv.kendoDropDownList({
        optionLabel: "Please select",
        dataTextField: "Text",
        dataValueField: "Value",
        dataSource: {
            transport: {
                read: {
                    url: '/Sale/GetItemUnitsByGroupForSale',
                    data: function () {
                        return { groupID: saleItemUnitgroupID }
                    },
                }
            }
        },
        change: function (e) {
            setSItemTotalSt($(e.sender.element.context).parent());
        }
    });

    select_saleitemunit[rowCount] = dropDiv.data("kendoDropDownList");
    $('#stock-items tr:last-child').find('.item-search').focus();
}

function removeStockSale(ref) {
    keyPressBeep();
    $(ref).parent().parent().remove();
    setSnSt();

}
function setSnSt() {
    var rowCount = 0;
    $("#stock-items tr:gt(0)").each(function () {

        $(this).find('td:eq(0)').html(rowCount + 1);
        $(this).find('td:eq(1) .item-search').attr('name', 'Stock.uItem[' + rowCount + '].ItemNo');
        $(this).find('td:eq(2) .item-id-hdn').attr('name', 'Stock.uItem[' + rowCount + '].ItemID');
        $(this).find('td:eq(2) .sale-items').attr('name', 'Stock.uItem[' + rowCount + '].Desc');
        $(this).find('td:eq(3) input').attr('name', 'Stock.uItem[' + rowCount + '].Quantity');
        $(this).find('td:eq(4) input').attr('name', 'Stock.uItem[' + rowCount + '].SalePrice');
        $(this).find('td:eq(5) input').attr('name', 'Stock.uItem[' + rowCount + '].Total');
        rowCount++
    });
    calculateStockTotal();
}

function getLocationQuantity() {
    var loc = $("#transferFromLocation").val();
    if (loc) {
        $.ajax({
            type: "GET",
            contentType: "html",
            url: '/Transfer/getAllItems?Location=' + loc,
            async: true,
            success: function (data) {
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    html += "<option value=" + data[i].Value + ">" + data[i].Text + "</option>";
                }
                $(".tra-items").html(html);
                $('.tra-items').selectize();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
    }

}

function applyAutoComplete(id) {
    $('#' + id).mcautocomplete({
        showHeader: true,
        columns: [{
            name: 'Item No',
            width: '90px',
            valueField: 'label'
        }, {
            name: 'Name',
            width: '170px',
            valueField: 'value'
        }, {
            name: 'Description',
            width: '400px',
            valueField: 'desc'
        }, {
            name: 'QTY',
            width: '80px',
            valueField: 'locQuan'
        }, {
            name: 'Sale Pr',
            width: '65px',
            valueField: 'sp'
        }, {
            name: 'WSale Pr',
            width: '65px',
            valueField: 'wp'
        }, {
            name: 'Order Pr',
            width: '65px',
            valueField: 'op'
        }, {
            name: 'Special Pr',
            width: '65px',
            valueField: 'os'
        }
        , {
            name: 'Cost',
            width: '65px',
            valueField: 'cost'
        }
        ],
        focus: function (event, ui) {
            $('#' + id).val(ui.item.value + " " + ui.item.desc);
            return false;
        },
        // Event handler for when a list item is selected.
        select: function (event, ui) {
            $('#' + id).val(ui.item.value + " " + ui.item.desc);
            $("#" + id).parent().parent().find(".sale-item-base-price").val(ui.item.sp);
            $("#" + id).parent().parent().find(".sale-item-price").val(ui.item.sp);
            $("#" + id).parent().parent().find(".sale-item-cost").val(ui.item.cost);
            $("#" + id).parent().parent().find(".item-id-hdn").val(ui.item.id);
            $("#" + id).parent().parent().find(".item-search").val(ui.item.label);
            $("#" + id).parent().parent().find(".sale-item-quantity").val(1);
            $("#" + id).parent().parent().find(".sale-item-total").val(ui.item.sp);

            if (ui.item && ui.item.FkUnitGroupID) {
                var row = parseInt(id.substring(id.length - 1));
                saleItemUnitgroupID = ui.item.FkUnitGroupID;
                select_saleitemunit[row].dataSource.read();
            }

            if (ui.item.image != null) {
                $("#" + id).parent().parent().find(".image-col").html("<a href='#' onclick='openSaleImageModal(this)' style='color:green;'><i class='fa  fa-file-image-o fa-fw'></i></a> <input type='hidden' class='img-src' value='" + ui.item.image + "'/> <input type='hidden' class='img-src1' value='" + ui.item.image1 + "'/>");
            }
            var tabl = '<table style="font-size: 14px;"><thead><tr style="background-color:#B8D91A;"><th>Name</th><th>Price</th></tr></thead><tbody>';
            tabl += '<tr style="background-color:#97DAF5;"><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">Sale Price</td><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">' + ui.item.sp + '</td></tr>';
            tabl += '<tr style="background-color:#B8D91A;"><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">Whole Sale Price</td><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">' + ui.item.wp + '</td></tr>';
            tabl += '<tr style="background-color:#f25c57;"><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">Order Price</td><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">' + ui.item.op + '</td></tr>';
            tabl += '<tr style="background-color:#5cb85c;"><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">Special Price</td><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">' + ui.item.os + '</td></tr>';
            tabl += '<tr style="background-color:#97DAF5;"><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">Cost</td><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">' + ui.item.cost + '</td></tr>';
            tabl += '<tr style="background-color:#B8D91A;"><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">Previous Prices</td><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">' + ui.item.history + '</td></tr>';
            if ($("#Sale_FKCustomerID").val()) {
                $.ajax({
                    type: "GET",
                    contentType: "html",
                    url: '/Sale/getCustomerPrices?item=' + ui.item.id + '&customer=' + $("#Sale_FKCustomerID").val(),
                    async: false,
                    success: function (data) {
                        tabl += '<tr style="background-color:#97DAF5;"><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">Customer Prices</td><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">' + data + '</td></tr>';
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        handleErrors(textStatus);
                    }
                });
            }

            tabl += "</tbody></table>";

            $("#" + id).parent().parent().find(".prices").html("<a href='#' onclick='openPricesModal(this)'><i class='fa fa-usd fa-fw'></i></a> <input type='hidden' class='hdnPrices' value='" + tabl + "'/>");
            $("#" + id).parent().parent().find(".measuring-unit").html(ui.item.mu);

            //setSItemTotal();
            return false;
        },
        position: { collision: "flip" },
        source: function (request, response) {
            blockUI();
            $.ajax({
                url: 'Sale/getAllItemsForAuto', type: "GET",
                dataType: "json",
                data: { term: request.term, loc: $('#Sale_FKLocationID').val(), isPart: true },
                error: function (jqXHR, textStatus, errorThrown) {
                    handleErrors(textStatus);
                },
                success: function (data) {
                    unblockUI();
                    response($.map(data, function (item) {
                        return {
                            id: item.ItemID,
                            value: item.Name,
                            label: item.ItemNoStr,
                            make: item.CompanyMake,
                            locQuan: item.LocQuan,
                            image: item.Image,
                            image1: item.Image1,
                            desc: item.Description,
                            sp: parseFloat(item.SalePrice).toFixed(2),
                            wp: parseFloat(item.WholeSalePrice).toFixed(2),
                            op: parseFloat(item.OrderPrice).toFixed(2),
                            os: parseFloat(item.SpecialSalePrice).toFixed(2),
                            cost: parseFloat(item.PurchaseCost).toFixed(2),
                            FkUnitGroupID: item.FkUnitGroupID,
                            history: item.PreviousPrices

                        };
                    }))
                }
            })

        },
        minLength: 1
    });

}