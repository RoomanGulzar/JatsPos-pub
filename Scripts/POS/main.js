

var datePickerOptions = { format: "d/MM/yyyy", culture: "en-AU" };

function changeCulture(cul, format) {
    datePickerOptions.culture = cul;
    datePickerOptions.format = format;
}

function scrollTo(elementID) {
    $('html, body').animate({
        scrollTop: $("#" + elementID).offset().top
    }, 1000);
}
$.ajaxSetup({
    statusCode: {
        401: function () {
            $("#session-alert").dialog({
                resizable: false,
                modal: true,
                //title: "Confirm",
                // height: 250,
                width: 400,
                dialogClass: 'noTitleStuff',
                buttons: {
                    "OK": {
                        click: function () {
                            window.location = "../Login";

                            $(this).dialog("close");
                        },
                        text: 'OK',
                        class: 'btn btn-default'
                    }
                }
            });
        },
        403: function () {
            return $().toastmessage('showToast', {
                text: "You don't have sufficient permissions to do this, please contact your administrator",
                sticky: false,
                position: 'bottom-right',
                type: 'warning'

            });
        }
    }
});
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

function underDevelopement() {
    return $().toastmessage('showToast', {
        text: 'Under Developement',
        sticky: false,
        position: 'bottom-right',
        type: 'warning'

    });
}
function newTransfer() {
    getAllTransferData();
    $("showhidetransfer").click();
    //showHideAddTransfer(this);
    //getAllTransferData();
}
function errorToast(msg) {
    return $().toastmessage('showToast', {
        text: msg ? msg : 'Something went wrong, please try again or contact support',
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
function removeRow(ref) {
    $(ref).parent().parent().remove();
    setSn();
    setItemTotal();
}
function removeRowT(ref) {
    $(ref).parent().parent().remove();
    setSnTr();
    var total = 0;
    var items = 0;
    $("#Transfer-items tr").each(function () {
        var tot = $(this).find(".sale-item-total").val();
        var units = $(this).find(".sale-item-quantity").val();
        if (tot) {
            total += parseFloat(tot);
        }
        if (units) {
            items += parseFloat(units);
        }
    });
    $("#total-items ").val(items);
    $("#total-price").val(total);

}
function removeStockSale(ref) {
    $(ref).parent().parent().remove();
    setSnSt();

}
function removeRowSale(ref) {
    $(ref).parent().parent().remove();
    setSnSale();
    setSItemTotal();
}
function removeRowPO(ref) {
    $(ref).parent().parent().remove();
    setSnPO();
    setItemTotalPO();
}

function setSn() {
    var rowCount = 0;
    $("#quotation-items tr:gt(0)").each(function () {

        $(this).find('td:eq(0)').html(parseInt(rowCount) + 1);
        $(this).find('td:eq(1) select').attr('name', 'Quote.Items[' + rowCount + '].FKItemID');
        $(this).find('td:eq(3) input').attr('name', 'Quote.Items[' + rowCount + '].UnitPrice');
        $(this).find('td:eq(2) input').attr('name', 'Quote.Items[' + rowCount + '].Quantity');
        $(this).find('td:eq(4) input').attr('name', 'Quote.Items[' + rowCount + '].Total');
        rowCount++
    });
}
function setSnPO() {
    var rowCount = 0;
    $("#PO-items tr:gt(0)").each(function () {

        $(this).find('td:eq(0)').html(parseInt(rowCount) + 1);
        $(this).find('td:eq(2) .item-id-hdn').attr('name', 'PurchaseOrder.Items[' + rowCount + '].FKItemID');
        $(this).find('td:eq(2) .item-id-hdnc').attr('name', 'PurchaseOrder.Items[' + rowCount + '].Completed');
        $(this).find('td:eq(2) .item-id-hdnp').attr('name', 'PurchaseOrder.Items[' + rowCount + '].PurchaseItemID');
        $(this).find('td:eq(3) input').attr('name', 'PurchaseOrder.Items[' + rowCount + '].Quantity');
        $(this).find('td:eq(4) input').attr('name', 'PurchaseOrder.Items[' + rowCount + '].UnitPrice');
        $(this).find('td:eq(5) input').attr('name', 'PurchaseOrder.Items[' + rowCount + '].SalePrice');
        $(this).find('td:eq(6) input').attr('name', 'PurchaseOrder.Items[' + rowCount + '].Total');
        rowCount++
    });
}
//calculate total and set values for quotation
function calculate() {

    var itemTotal = 0;
    $(".sale-item-total").each(function () {

        var val = this.value;
        if (val) {
            itemTotal = itemTotal + parseFloat(val);
        }
    });
    $("#Quote_SubTotal").val(itemTotal);
    var total = itemTotal;

    var gstP = $("#Quote_Tax").val();
    if (gstP) {
        gstp = parseFloat(gstP) / 100 * itemTotal;
        total = parseFloat(itemTotal) + parseFloat(gstp);
    }

    var dis = $("#Quote_Discount").val();
    if (dis) {
        dis = parseFloat(dis) / 100 * itemTotal;
        total = parseFloat(total) - parseFloat(dis);
    }
    $("#Quote_Total").val(total);

}
// calcualte total for PO form
function calculatePO() {

    var itemTotal = 0;
    $(".sale-item-total").each(function () {
        var val = this.value;
        if (val) {
            itemTotal = itemTotal + parseFloat(val);
        }
    });
    $("#Purchaseorder_SubTotal").val(parseFloat(itemTotal).toFixed(2));

    var Freights = $("#Purchaseorder_Freight").val();
    if (Freights) {
        //dis = parseFloat(dis) / 100 * itemTotal;
        itemTotal = itemTotal + parseFloat(Freights);
    }
    var Discounts = $("#Purchaseorder_Discount").val();
    if (Discounts) {
        //dis = parseFloat(dis) / 100 * itemTotal;
        itemTotal = itemTotal - parseFloat(Discounts);
    }
    var gstP = $("#Purchaseorder_Tax").val();
    var total = itemTotal;//$("#Purchaseorder_Total").val();
    if (gstP) {
        //alert(total);
        gstp = (parseFloat(gstP) / 100) * total;
        total = total + parseFloat(gstp);
    }
    $("#Purchaseorder_Total").val(parseFloat(total).toFixed(2));
}
//setting a row total for quotation ..Line Total
function setItemBasePrice(ref) {
    $(ref).parent().parent().find(".sale-item-changed-price").val(1);
    setItemTotal(ref);
}
function setItemTotal(ref) {
    var qty = $($(ref).parent().parent().find(".sale-item-unit")[1]);
    var qtyDropDown = qty.data("kendoDropDownList");
    //var value = qtyDropDown.value();
    var unitQty = qtyDropDown ? qtyDropDown.dataItem() : null;
    var unit = $(ref).parent().parent().find(".sale-item-quantity").val();
    var basePrice = $(ref).parent().parent().find(".sale-item-base-price").val();
    var price = basePrice * (unitQty && unitQty.Qty ? unitQty.Qty : 1);
    var priceChanged = parseInt($(ref).parent().parent().find(".sale-item-changed-price").val());
    if (priceChanged !== 1) {
        $(ref).parent().parent().find(".sale-item-price").val(price);
    } else {
        price = $(ref).parent().parent().find(".sale-item-price").val();
    }

    if (unit != "" && price != "") {
        $(ref).parent().parent().find(".sale-item-total").val(parseFloat(unit) * parseFloat(price));
        calculate();
    }

}
function moveToSale(id) {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Sale/Index?id=' + id,
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function acceptPO(id) {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/PurchaseOrder/AcceptPO?id=' + id,
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
//for PO set total
function setItemTotalPO(ref) {

    var unit = $(ref).parent().parent().find(".sale-item-quantity").val();
    var price = $(ref).parent().parent().find(".sale-item-cost").val();

    if (unit != "" && price != "") {
        $(ref).parent().parent().find(".sale-item-total").val(parseFloat(unit) * parseFloat(price));
        calculatePO();
    }

}
function setItemTotalTr(ref) {
    var unit = $(ref).parent().parent().find(".sale-item-quantity").val();
    var item = $(ref).parent().parent().find(".item-id-hdn").val();
    var itemVar = $(ref).parent().parent().find(".item-var-id-hdn").val();
    var price = $(ref).parent().parent().find(".sale-item-price").val();
    var location = $("#Sale_FKLocationID").val();
    
    if (unit != "" && price != "") {
        $(ref).parent().parent().find(".sale-item-total").val(parseFloat(unit) * parseFloat(price));
    }
    var unitTotal = 0;
    $('input[value="' + item + '"]').each(function () {
        var bv = $(this).parent().parent().find(".sale-item-quantity").val();
        unitTotal = unitTotal + parseFloat(bv);
    });
    if (unit) {
        $.ajax({
            type: "GET",
            contentType: "html",
            url: '/Sale/CheckLocQuan?item=' + item + '&&itemVar=' + itemVar + '&&location=' + location + '&&quantity=' + unitTotal + '&&price=' + price,
            async: true,
            success: function (data) {
                if (data) {
                    $('.btn-primary').show();
                    $(ref).css({ "border-color": "Green" });
                    return false;
                }
                else {
                    var txt = "Insufficient Items ( " + $(ref).parent().parent().find(".sale-items").val() + " ) at Location ( " + $("#Sale_FKLocationID").text() + " ) or Price less than purchase price";
                    $(ref).css({ "border-color": "Red" });
                    $('.btn-primary').hide();
                    return $().toastmessage('showToast', {
                        text: txt,
                        sticky: false,
                        position: 'bottom-right',
                        type: 'warning'

                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
    }

    var total = 0;
    var items = 0;
    $("#Transfer-items tr").each(function () {
        var tot = $(this).find(".sale-item-total").val();
        var units = $(this).find(".sale-item-quantity").val();
        if (tot) {
            total += parseFloat(tot);
        }
        if (units) {
            items += parseFloat(units);
        }
    });
    $("#total-items").val(items);
    $("#total-price").val(total);

}
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
function openSaleImageModal(src) {
    var img = $(src).parent().find(".img-src").val();
    var img1 = $(src).parent().find(".img-src1").val();
    if (img != null && img1 != null) {
        var div = '<img class="imgZoom" width="200px" height="200px" src="data:image/png;base64,' + img + '">';
        div += '<img class="imgZoom" width="200px" height="200px" src="data:image/png;base64,' + img1 + '">';
        $(".image-modal .modal-body").html(div);
  
    }
    else if (img != null)
        {
        var div = '<img class="imgZoom" width="200px" height="200px" src="data:image/png;base64,' + img + '">';
        $(".image-modal .modal-body").html(div);
    }
    else if (img1 != null)
    {
        var div = '<img class="imgZoom" width="200px" height="200px" src="data:image/png;base64,' + img1 + '">';
        $(".image-modal .modal-body").html(div);
    }
    else {
        $(".image-modal .modal-body").html("No Image Found !");
    }
    $(".imgZoom").mouseenter(function () {
        $(this).width(600);
        $(this).height(600);
    }).mouseleave(function () {
        $(this).width(200);
        $(this).height(200);
    });3
    $(".image-modal").modal("show");
}
function openPricesModal(ref) {
    var prices = $(ref).parent().find(".hdnPrices").val();
    $(".prices-modal .modal-body").html(prices);
    $(".prices-modal").modal("show");
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
            //, {
        //    name: 'Category',
        //    width: '120px',
        //    valueField: 'cat'
        //}
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
            $("#" + id).parent().parent().find(".item-var-id-hdn").val(ui.item.FKServiceID);
            $("#" + id).parent().parent().find(".item-search").val(ui.item.label);
            $("#" + id).parent().parent().find(".sale-item-quantity").val(1);
            $("#" + id).parent().parent().find(".sale-item-allowdiscount").val(ui.item.AllowedDiscount);
            $("#" + id).parent().parent().find(".sale-item-discountallowed").val(ui.item.Discount);
            $("#" + id).parent().parent().find(".sale-item-discount").val(0);
            $("#" + id).parent().parent().find(".sale-item-istaxable").val(ui.item.IsTaxable);
            $("#" + id).parent().parent().find(".sale-item-taxrate").val(ui.item.TaxRate);
            $("#" + id).parent().parent().find(".sale-item-tax").val(0);
            $("#" + id).parent().parent().find(".sale-item-total").val(ui.item.sp);

            if (ui.item && ui.item.FkUnitGroupID) {
                var row = parseInt(id.substring(id.length - 1));
                saleItemUnitgroupID = ui.item.FkUnitGroupID;
                saleItemUnitID = ui.item.FkUnitID;
                saleItemID = ui.item.id;
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
            //if ($("#Sale_FKCustomerID").val()) {
            //    $.ajax({
            //        type: "GET",
            //        contentType: "html",
            //        url: '/Sale/getCustomerPrices?item=' + ui.item.id + '&customer=' + $("#Sale_FKCustomerID").val(),
            //        async: false,
            //        success: function (data) {
            //            tabl += '<tr style="background-color:#97DAF5;"><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">Customer Prices</td><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">' + data + '</td></tr>';
            //        },
            //        error: function (jqXHR, textStatus, errorThrown) {
            //            handleErrors(textStatus);
            //        }
            //    });
            //}

            tabl += "</tbody></table>";

            $("#" + id).parent().parent().find(".prices").html("<a href='#' onclick='openPricesModal(this)'><i class='fa fa-usd fa-fw'></i></a> <input type='hidden' class='hdnPrices' value='" + tabl + "'/>");
            $("#" + id).parent().parent().find(".measuring-unit").html(ui.item.mu);

            setSItemTotal();
            return false;
        },
        position: { collision: "flip" },
        source: function (request, response) {
            blockUI();
            $.ajax({
                url: 'Sale/getAllItemsForAuto', type: "GET",
                dataType: "json",
                data: { term: request.term, loc: $('#Sale_FKLocationID').val() },
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
                            FkUnitID: item.FkUnitID,
                            FKServiceID: item.ServiceID,
                            history: item.PreviousPrices,
                            Discount: item.Discount,
                            AllowedDiscount: item.AllowedDiscount,
                            IsTaxable: item.IsTaxable,
                            TaxRate: item.TaxRate

                        };
                    }))
                }
            })

        },
        minLength: 2
    });

}

function applyAutoCompleteBarcode(id) {
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
            //, {
        //    name: 'Category',
        //    width: '120px',
        //    valueField: 'cat'
        //}
        ],
        focus: function (event, ui) {
            $('#' + id).val(ui.item.label);//ui.item.value + " " + ui.item.desc);
            return false;
        },
        // Event handler for when a list item is selected.
        select: function (event, ui) {
            $('#' + id).val(ui.item.label);//ui.item.value + " " + ui.item.desc);
            return false;
        },
        position: { collision: "flip" },
        source: function (request, response) {
            blockUI();
            $.ajax({
                url: 'Sale/getAllItemsForAuto', type: "GET",
                dataType: "json",
                data: { term: request.term, loc: $('#Sale_FKLocationID').val() },
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
                            desc: item.Description,
                            sp: parseFloat(item.SalePrice).toFixed(2),
                            wp: parseFloat(item.WholeSalePrice).toFixed(2),
                            op: parseFloat(item.OrderPrice).toFixed(2),
                            os: parseFloat(item.SpecialSalePrice).toFixed(2),
                            cost: parseFloat(item.PurchaseCost).toFixed(2),
                            mu: item.MeasuringUnit,
                            history: item.PreviousPrices

                        };
                    }))
                }
            })

        },
        minLength: 2
    });

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
function setSnTr() {
    var rowCount = 0;
    $("#Transfer-items tr:gt(0)").each(function () {

        $(this).find('td:eq(0)').html(rowCount + 1);
        $(this).find('td:eq(2) .item-id-hdn').attr('name', 'Transfer.Items[' + rowCount + '].FKItemID');
        $(this).find('td:eq(3) input').attr('name', 'Transfer.Items[' + rowCount + '].Quantity');
        rowCount++
    });
}
function setSnSale() {
    var rowCount = 0;
    $("#sale-items tr:gt(0)").each(function () {

        $(this).find('td:eq(0)').html(rowCount + 1);
        $(this).find('td:eq(2) .item-id-hdn').attr('name', 'Sale.pItems[' + rowCount + '].FKItemID');
        $(this).find('td:eq(4) input').attr('name', 'Sale.pItems[' + rowCount + '].UnitPrice');
        $(this).find('td:eq(3) input').attr('name', 'Sale.pItems[' + rowCount + '].Quantity');
        $(this).find('td:eq(5) input').attr('name', 'Sale.pItems[' + rowCount + '].Total');
        rowCount++
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
function setSItemBasePrice(ref) {
    $(ref).parent().parent().find(".sale-item-changed-price").val(1);
    setSItemTotal(ref);
}
function setSItemTotal(ref) {

    var qty = $($(ref).parent().parent().find(".sale-item-unit")[1]);
    var qtyDropDown = qty.data("kendoDropDownList");
    //var value = qtyDropDown.value();
    var unitQty = qtyDropDown ? qtyDropDown.dataItem() : null;
    var unit = $(ref).parent().parent().find(".sale-item-quantity").val();
    var item = $(ref).parent().parent().find(".item-id-hdn").val();
    var basePrice = $(ref).parent().parent().find(".sale-item-base-price").val();
    var price = basePrice * (unitQty && unitQty.Qty ? unitQty.Qty : 1);
    var priceChanged = parseInt($(ref).parent().parent().find(".sale-item-changed-price").val());
    if (priceChanged !== 1) {
        $(ref).parent().parent().find(".sale-item-price").val(price);
    } else {
        price = $(ref).parent().parent().find(".sale-item-price").val();
    }

    var allowedDiscount = $(ref).parent().parent().find(".sale-item-allowdiscount").val();
    var discountAllowed = $(ref).parent().parent().find(".sale-item-discountallowed").val();
    var discount = allowedDiscount === true || allowedDiscount === "true" ? (parseFloat(unit) * (price * parseFloat(discountAllowed)) / 100) : 0;
    $(ref).parent().parent().find(".sale-item-discount").val(discount);

    var isTaxable = $(ref).parent().parent().find(".sale-item-istaxable").val();
    var taxRate = $(ref).parent().parent().find(".sale-item-taxrate").val();
    var tax = isTaxable === true || isTaxable === "true" ? (parseFloat(unit) * (price * parseFloat(taxRate) / 100)) : 0;
    $(ref).parent().parent().find(".sale-item-tax").val(tax);

    //var location = $("#Sale_FKLocationID").val();
    //if (item == "") {
    //    return false;
    //}
    if (parseFloat(unit) < 1) {
        return $().toastmessage('showToast', {
            text: "Quantity must be greater than zero",
            sticky: false,
            position: 'bottom-right',
            type: 'warning'

        });
    }

    if (unit != "" && price != "") {
        $(ref).parent().parent().find(".sale-item-total").val((parseFloat(unit) * parseFloat(price)) - parseFloat(discount) + parseFloat(tax));
        calculateSale();
    }
    //var unitTotal = 0;
    //$('input[value="' + item + '"]').each(function () {
    //    var bv = $(this).parent().parent().find(".sale-item-quantity").val();
    //    unitTotal = unitTotal + parseFloat(bv);
    //});
    //if (unit) {
    //    $.ajax({
    //        type: "GET",
    //        contentType: "html",
    //        url: '/Sale/CheckLocQuan?item=' + item + '&&location=' + location + '&&quantity=' + unitTotal + '&&price=' + price,
    //        async: true,
    //        success: function (data) {
    //            if (data) {
    //                $('.btn-primary').show();
    //                $(ref).css({ "border-color": "Green" });
    //                return false;
    //            }
    //            else {
    //                var txt = "Insufficient Items ( " + $(ref).parent().parent().find(".sale-items").val() + " ) at Location ( " + $("#Sale_FKLocationID").text() + " ) or Price less than purchase price";
    //                $(ref).css({ "border-color": "Red" });
    //                $('.btn-primary').hide();
    //                return $().toastmessage('showToast', {
    //                    text: txt,
    //                    sticky: false,
    //                    position: 'bottom-right',
    //                    type: 'warning'

    //                });
    //            }
    //        },
    //        error: function (jqXHR, textStatus, errorThrown) {
    //            handleErrors(textStatus);
    //        }
    //    });
    //}
}

function calculateSale() {

    var itemTotal = 0;
    $(".sale-item-total").each(function () {
        var val = this.value;
        if (val) {
            itemTotal = itemTotal + parseFloat(val);
        }
    });
    $("#Sale_SubTotal").val(itemTotal);

    var itemDiscount = 0;
    $(".sale-item-discount").each(function () {
        var val = this.value;
        if (val) {
            itemDiscount = itemDiscount + parseFloat(val);
        }
    });
    $("#Sale_DiscountAmount").val(itemDiscount);

    var itemTax = 0;
    $(".sale-item-tax").each(function () {
        var val = this.value;
        if (val) {
            itemTax = itemTax + parseFloat(val);
        }
    });
    $("#Sale_TaxAmount").val(itemTax);

    //var gstP = $("#Sale_GST").val();
    //var gst_amt = $("#tax-amount").val();
    var total = itemTotal;
    //if (gstP) {
    //    gstp = (parseFloat(gstP) / 100) * total;
    //    $("#tax-amount").val(gstp);
    //    total = parseFloat(total) + parseFloat(gstp);
    //}

    //var dis = $("#Sale_Discount").val();
    //var dis_amt = $("#disc-amount").val();
    //if (dis) {
    //    dis = parseFloat(dis) / 100 * itemTotal;
    //    $("#disc-amount").val(dis);
    //    total = parseFloat(total) - parseFloat(dis);
    //}
    var oth = $("#Sale_Other").val();
    if (!oth) {
        oth = 0;
    }
    total = parseFloat(total) + parseFloat(oth);
    $("#Sale_Total").val(total);
    $("#Sale_Due").val(total);
    $("#Sale_Received").val(total);


}
function addCargoCharges() {
    var itemTotal = 0;
    $(".sale-item-total").each(function () {
        var val = this.value;
        if (val) {
            itemTotal = itemTotal + parseFloat(val);
        }
    });
    $("#Sale_SubTotal").val(itemTotal);
    var total = itemTotal;
    //var dis = $("#disc-amount").val();
    //if (!dis) {
    //    dis = 0;
    //}
    //total = parseFloat(total) - parseFloat(dis);
    //var gst_amt = $("#tax-amount").val();
    //if (!gst_amt) {
    //    gst_amt = 0;
    //}
    //total = parseFloat(total) + parseFloat(gst_amt);
    var oth = $("#Sale_Other").val();
    if (!oth) {
        oth = 0;
    }
    total = parseFloat(total) + parseFloat(oth);
    $("#Sale_Total").val(total);
    $("#Sale_Received").val(total);
}
function calculateSaleAmtT(ref) {
    var id = $(ref).attr("id");
    var itemTotal = 0;
    $(".sale-item-total").each(function () {
        var val = this.value;
        if (val) {
            itemTotal = itemTotal + parseFloat(val);
        }
    });
    $("#Sale_SubTotal").val(itemTotal);
    var gstP = $("#Sale_GST").val();
    var gst_amt = $("#tax-amount").val();
    var total = itemTotal;
    if (id == "Sale_GST") {
        gstp = (parseFloat(gstP) / 100) * total;
        $("#tax-amount").val(gstp);
        total = parseFloat(total) + parseFloat(gstp);
    }
    else {
        gstp = parseFloat(gst_amt) / itemTotal * 100;
        $("#Sale_GST").val(gstp);
        total = parseFloat(total) + parseFloat(gst_amt);
    }
    var dis_amt = $("#disc-amount").val();
    if (dis_amt) {
        total = parseFloat(total) - parseFloat(dis_amt);
    }
    var oth = $("#Sale_Other").val();
    if (oth) {
        total = (parseFloat(total) + parseFloat(oth)).toFixed(2);
    }
    $("#Sale_Total").val(total);
    $("#Sale_Due").val(total);
    $("#Sale_Received").val(total);
}
function calculateSaleAmt(ref) {

    var id = $(ref).attr("id");
    var itemTotal = 0;
    $(".sale-item-total").each(function () {
        var val = this.value;
        if (val) {
            itemTotal = itemTotal + parseFloat(val);
        }
    });
    $("#Sale_SubTotal").val(itemTotal);
    var total = itemTotal;
    var dis = $("#Sale_Discount").val();
    var dis_amt = $("#disc-amount").val();
    if (id == "Sale_Discount") {
        dis = parseFloat(dis) / 100 * itemTotal;
        $("#disc-amount").val(dis);
        total = parseFloat(total) - parseFloat(dis);
    }
    else {
        disamt = parseFloat(dis_amt) / itemTotal * 100;
        $("#Sale_Discount").val(disamt);
        total = parseFloat(total) - parseFloat(dis_amt);
    }
    var gst_amt = $("#tax-amount").val();
    if (gst_amt) {
        total = parseFloat(total) + parseFloat(gst_amt);
    }
    var oth = $("#Sale_Other").val();
    if (oth) {
        total = (parseFloat(total) + parseFloat(oth)).toFixed(2);
    }
    $("#Sale_Total").val(total);
    $("#Sale_Due").val(total);
    $("#Sale_Received").val(total);
}
function onReceiveChange() {
    var total = parseFloat($("#Sale_Total").val());
    var rec = parseFloat($("#Sale_Received").val());
    $("#Sale_Due").val(total - rec);
}
function addNewRowSale() {
    var rowCount = parseInt($('#sale-items >tbody >tr').length);
    var row = "<tr>";
    row += "<td>" + (rowCount + 1) + "</td>";
    row += '<td><input type="text" class="form-control item-search" onchange="getItemDetailByNumber(this, ' + (rowCount + 1) + ')"/></td>';
    row += "<td> <input id='Sale-item-" + rowCount + "' class='sale-items form-control' />"
        + "<input type='hidden' class='item-id-hdn' name='Sale.pItems[" + rowCount + "].FKItemID' />"
        + "<input type='hidden' class='item-var-id-hdn' name='Sale.pItems[" + rowCount + "].FKServiceID' />"
        + "</td>";
    row += "<td><input type='number' class='form-control sale-item-quantity' onblur='setSItemTotal(this)' name='Sale.pItems[" + rowCount + "].Quantity' required/></td>";
    row += "<td><div id='Sale_pItems" + rowCount + "_FkUnitID' class='form-control sale-item-unit'></div></td>";

    row += "<td><input type='number' style='display:none;' class='sale-item-base-price' name='Sale.pItems[" + rowCount + "].BasePrice' />";
    row += "<input type='number' style='display:none;' class='sale-item-changed-price' name='Sale.pItems[" + rowCount + "].PriceChanged' />";
    row += "<input type='number' class='form-control sale-item-price' onchange='setSItemBasePrice(this)' name='Sale.pItems[" + rowCount + "].UnitPrice' required/></td>";

    row += "<td><input type='checkbox' style='display:none;' class='form-control sale-item-allowdiscount' value='false' />";
    row += "<input type='number' style='display:none;' class='form-control sale-item-discountallowed' value='0' />";
    row += "<input type='number' class='form-control sale-item-discount' name='Sale.pItems[" + rowCount + "].Discount' readonly/></td>";

    row += "<td><input type='checkbox' style='display:none;' class='form-control sale-item-istaxable' value='false' />";
    row += "<input type='number' style='display:none;' class='form-control sale-item-taxrate' value='0' />";
    row += "<input type='number' class='form-control sale-item-tax' name='Sale.pItems[" + rowCount + "].Tax' readonly/></td>";

    row += "<td><input type='number' class='form-control sale-item-total' name='Sale.pItems[" + rowCount + "].Total' readonly/></td>";
    //row += "<td ><label class='measuring-unit'></label> <span class='prices'></span><span class='image-col'></span> </td>";
    row += "<td><a href='#' onclick='removeRowSale(this)'><i class='fa fa-trash fa-fw'></i></a></td></tr>";
    $('#sale-items >tbody').append(row);
    // $("#Sale-item-" + rowCount + "").parent().parent().find(".item-search").focus();
    applyAutoComplete("Sale-item-" + rowCount);

    saleItemUnitgroupID = null;
    saleItemUnitID = null;
    saleItemID = null;
    var dropDiv = $("#Sale_pItems" + rowCount + "_FkUnitID");
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
        dataBound: function (e) {
            this.value(saleItemUnitID);
        },
        change: function (e) {
            var ref = $(e.sender.element.context).parent();
            $(ref).parent().parent().find(".sale-item-changed-price").val(0);
            setSItemTotal(ref);
        }
    });

    select_saleitemunit[rowCount] = dropDiv.data("kendoDropDownList");
    setSItemTotal();
    $('#sale-items tr:last-child').find('.item-search').focus();
}
function addNewRowStock() {
    var rowCount = parseInt($('#stock-items >tbody >tr').length);
    var row = "<tr>";
    row += "<td>" + (rowCount + 1) + "</td>";
    row += '<td><input name="Stock.uItem[' + rowCount + '].ItemNo" type="text" class="form-control item-search" onchange="getItemDetailByNumber(this, ' + (rowCount + 1) + ')" /></td>';
    row += "<td> <input id='TR-item-" + rowCount + "' name='Stock.uItem[" + rowCount + "].Desc' class='sale-items form-control' />";
    row += "<input type='hidden' class='item-id-hdn' name='Stock.uItem[" + rowCount + "].ItemID' />";
    row += "<input type='hidden' class='item-var-id-hdn' name='Stock.uItem[" + rowCount + "].ItemVarID' /></td>";
    row += "<td><input type='number' class='form-control sale-item-quantity' onblur='setSItemTotalSt(this)' name='Stock.uItem[" + rowCount + "].Quantity' required/></td>";
    row += "<td><div id='Stock_uItem" + rowCount + "_FkUnitID' class='form-control sale-item-unit'></div></td>";
    row += '<td><input type="number" class="form-control sale-item-price"  name="Stock.uItem[' + rowCount + '].SalePrice" readonly /></td>';
    row += "<td><input type='number' class='form-control sale-item-total'  name='Stock.uItem[" + rowCount + "].Total' readonly/></td>";
    row += "<td><label class='measuring-unit'></label> <span class='prices'></span><span class='image-col'></span></td><td><a href='#' onclick='removeStockSale(this)'><i class='fa fa-trash fa-fw'></i></a></td></tr>";
    $('#stock-items >tbody').append(row);
    applyAutoComplete("TR-item-" + rowCount);

    saleItemUnitgroupID = null;
    saleItemUnitID = null;
    saleItemID = null;
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
                        return { groupID: saleItemUnitgroupID, itemID: saleItemID }
                    },
                }
            }
        },
        dataBound: function (e) {
            this.value(saleItemUnitID);
        },
        change: function (e) {
            setSItemTotalSt($(e.sender.element.context).parent());
        }
    });

    select_saleitemunit[rowCount] = dropDiv.data("kendoDropDownList");
    $('#stock-items tr:last-child').find('.item-search').focus();
}
//Add row on Quotation page
function addNewRowQoute() {
    var rowCount = parseInt($('#quotation-items >tbody >tr').length);
    var row = "<tr>";
    row += "<td>" + (rowCount + 1) + "</td>";
    row += '<td><input type="text" class="form-control item-search" onchange="getItemDetailByNumber(this, ' + (rowCount + 1) + ')"/></td>';
    row += "<td> <input id='Qu-item-" + rowCount + "' name='Quote.Items[" + rowCount + "].Name' class='sale-items form-control' /> <input type='hidden' class='item-id-hdn' name='Quote.Items[" + rowCount + "].FKItemID' /></td>";
    row += "<td><input type='number' class='form-control sale-item-quantity' onblur='setItemTotal(this)' name='Quote.Items[" + rowCount + "].Quantity' required/></td>";
    row += "<td><div id='Quote_Items" + rowCount + "_FkUnitID' class='form-control sale-item-unit'></div></td>";

    row += "<td><input type='number' style='display:none;' class='sale-item-base-price' name='Quote.Items[" + rowCount + "].BasePrice' />";
    row += "<input type='number' style='display:none;' class='sale-item-changed-price' name='Quote.Items[" + rowCount + "].PriceChanged' />";
    row += "<input type='number' class='form-control sale-item-price' onchange='setItemBasePrice(this)' name='Quote.Items[" + rowCount + "].UnitPrice' required/></td>";
    row += "<td><input type='number' class='form-control sale-item-total' name='Quote.Items[" + rowCount + "].Total' readonly/></td><td ><label class='measuring-unit'></label><span class='prices'></span> <span class='image-col'></span> </td><td><a href='#' onclick='removeRow(this)'><i class='fa fa-trash fa-fw'></i></a></td></tr>";
    $('#quotation-items >tbody').append(row);
    $("#Qu-item-" + rowCount + "").parent().parent().find(".item-search").focus();
    applyAutoComplete("Qu-item-" + rowCount);

    saleItemUnitgroupID = null;
    var dropDiv = $("#Quote_Items" + rowCount + "_FkUnitID");
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
            var ref = $(e.sender.element.context).parent();
            $(ref).parent().parent().find(".sale-item-changed-price").val(0);
            setItemTotal(ref);
        }
    });

    select_saleitemunit[rowCount] = dropDiv.data("kendoDropDownList");
}
//Add row on PO form
function addNewRowPO() {
    var rowCount = parseInt($('#PO-items >tbody >tr').length);
    var row = "<tr>";
    row += "<td>" + (rowCount + 1) + "</td>";
    row += '<td><input type="text" class="form-control item-search" onchange="getItemDetailByNumberPO(this)"/></td>';
    row += "<td> <input id='Po-item-" + rowCount + "' class='sale-items form-control' />"
        + "<input type='hidden' class='item-id-hdn' name='PurchaseOrder.Items[" + rowCount + "].FKItemID' />"
        + "<input type='hidden' class='item-var-id-hdn' name='PurchaseOrder.Items[" + rowCount + "].FkItemVariantID' />"
        + "</td>";
    row += "<td><input type='number' class='form-control sale-item-quantity' onblur='setItemTotalPO(this)' name='PurchaseOrder.Items[" + rowCount + "].Quantity' required/></td>";
    row += "<td><input type='number' class='form-control sale-item-price-po sale-item-cost' onchange='setItemTotalPO(this)' name='PurchaseOrder.Items[" + rowCount + "].UnitPrice'/></td>";
    row += "<td><input type='number' class='form-control sale-item-price' onchange='setItemTotalPO(this)' name='PurchaseOrder.Items[" + rowCount + "].SalePrice' required/></td>";
    row += "<td><input type='number' class='form-control sale-item-total' name='PurchaseOrder.Items[" + rowCount + "].Total' readonly/></td>";
    row += "<td><a href='#' onclick='removeRowPO(this)'><i class='fa fa-trash fa-fw'></i></a></td></tr>";
    $('#PO-items >tbody').append(row);
    $("#Po-item-" + rowCount + "").parent().parent().find(".item-search").focus();
    applyAutoComplete("Po-item-" + rowCount);
}

function addNewRowImage() {
    var rowCount = parseInt($('#item-images >tbody >tr').length);
    var row = "<tr>";
    row += "<td><input type='file' id='Item.ItemImages["
        + rowCount + "].Image' name='Item.ItemImages[" + rowCount + "].ImageBase64' /></td>";
    row += "<td> <input name='Item.ItemImages[" + rowCount + "].Description' class='sale-items form-control' />";
    row += "<td><a href='#' onclick='removeItemImageRow(this); return false;'><i class='fa fa-trash fa-fw'></i></a></td>";
    row += "</tr>";
    $('#item-images >tbody').append(row);
}
function removeItemImageRow(ref, index) {
    $(ref).parent().parent().remove();
    setSnItemImage(index);
}
function setSnItemImage(startIndex) {
    var rowCount = 0;
    $("#item-images tr:gt(0)").each(function () {
        if (startIndex <= rowCount) {

            $(this).find('td').each(function () {
                $(this).find('input').each(function (index, obj) {
                    var inputName = obj.name;
                    if (inputName) {
                        var replace = 'Item.ItemImages[' + (rowCount + 1) + ']';
                        var replaceWith = 'Item.ItemImages[' + rowCount + ']';
                        inputName = inputName.replace(replace, replaceWith);
                        $(this).attr('name', inputName);
                    }

                });

            });
        }

        rowCount++
    });
}

/************************  Condition **********************************/

function showHideAddCondition(ref) {

    if ($(ref).parent().find(".add-div").css('display') == 'none') {
        $(ref).parent().find(".add-div").show("slow");
        $(ref).prop('value', 'HIDE');
        //alert('');
        $(".condition-tab-div").toggle();

    }
    else {
        $(ref).parent().find(".add-div").hide("slow");
        $(".condition-tab-div").toggle();
        $.ajax({
            type: "GET",
            contentType: "html",
            url: '/Condition/Create',
            async: true,
            success: function (data) {
                $("#con-div").html("");
                $("#con-div").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
        $(ref).prop('value', 'ADD NEW');

    }
}
function showHideAddLocation(ref) {

    if ($(ref).parent().find(".add-div").css('display') == 'none') {
        $(ref).parent().find(".add-div").show("slow");
        $(ref).prop('value', 'HIDE');
        //alert('');
        $(".condition-tab-div").toggle();

    }
    else {
        $(ref).parent().find(".add-div").hide("slow");
        $(".condition-tab-div").toggle();
        $.ajax({
            type: "GET",
            contentType: "html",
            url: '/Location/Create',
            async: true,
            success: function (data) {
                $("#con-div").html("");
                $("#con-div").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
        $(ref).prop('value', 'ADD NEW');

    }
}
function getAutoPO() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/PurchaseOrder/GenrateAutoPO',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getUsersPerm() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/User/SetUserPermission',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getClose() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Sale/Close',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getAllPo() {
    debugger;
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Reports/AllPurchaseOrder',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getStockHistoryData() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Item/StockHistory',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getStockData() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Item/Stock',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getConditionData() {
    $(".condition-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Condition/Index',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getMesureingUnit() {
    debugger;
    $(".condition-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/MeasureUnit/Index',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getGroupMeasureinUnit() {
    debugger;
    $(".condition-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/MeasureUnit/CreateGroups',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function editCondition(id) {
    $(".condition-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Condition/Update?id=' + id,
        async: true,
        success: function (data) {
            $("#con-div").html("");
            $("#con-div").html(data);
            $("#con-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#con-div").show("slow");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function editLocation(id) {
    $(".condition-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Location/Update?id=' + id,
        async: true,
        success: function (data) {
            $("#con-div").html("");
            $("#con-div").html(data);
            $("#con-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#con-div").show("slow");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

/************************  Customer**********************************/

function showHideAddCus(ref) {
    if ($(ref).parent().find(".add-div").css('display') == 'none') {
        $(ref).parent().find(".add-div").show("slow");
        $(ref).prop('value', 'HIDE');
        $(".customer-tab-div").toggle();

    }
    else {
        $(".customer-tab-div").toggle();
        $(ref).parent().find(".add-div").hide("slow");
        $.ajax({
            type: "GET",
            contentType: "html",
            url: '/Customer/Create',
            async: true,
            success: function (data) {
                $("#cus-div").html("");
                $("#cus-div").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
        $(ref).prop('value', 'ADD NEW');

    }
}
function getCustomers() {
    $(".customer-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Customer/Index',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getHomeIndex() {
    $(".customer-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Home/Index',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function editCustomer(id) {
    $(".customer-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Customer/Update?id=' + id,
        async: true,
        success: function (data) {
            $("#cus-div").html("");
            $("#cus-div").html(data);
            $("#cus-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#cus-div").show("slow");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function deleteCustomer(id) {
    if (confirm("Are you sure you want to delete this ?")) {
        blockUI();
        var po = { 'id': id };
        $.ajax({
            type: 'POST',
            url: '/Customer/Delete',
            data: JSON.stringify(po),
            contentType: 'application/json',
            success: function (data) {
                if (data) {
                    successToast();
                    getCustomers();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });

    }

}

/************************  GROUP**********************************/

function showHideAddGroup(ref) {

    if ($(ref).parent().find(".add-div").css('display') == 'none') {
        $(ref).parent().find(".add-div").show("slow");
        $(ref).prop('value', 'HIDE');
        $(".group-tab-div").toggle();

    }
    else {
        $(".group-tab-div").toggle();
        $(ref).parent().find(".add-div").hide("slow");
        $.ajax({
            type: "GET",
            contentType: "html",
            url: '/Group/Create',
            async: true,
            success: function (data) {
                $("#grp-div").html("");
                $("#grp-div").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
        $(ref).prop('value', 'ADD NEW');

    }
}
function getGroupData() {
    $(".group-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Group/Index',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function editGroup(id) {
    $(".group-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Group/Update?id=' + id,
        async: true,
        success: function (data) {
            $("#grp-div").html("");
            $("#grp-div").html(data);
            $("#grp-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#grp-div").show("slow");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getLocationData() {
    $(".condition-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Location/Index',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function deleteGroup(id) {
    if (confirm("Are you sure you want to delete this ?")) {
        blockUI();
        var po = { 'id': id };
        $.ajax({
            type: 'POST',
            url: '/Group/Delete',
            data: JSON.stringify(po),
            contentType: 'application/json',
            success: function (data) {
                if (data) {
                    successToast();
                    getGroupData();
                }
                else
                {
                    errorToast();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });

    }

}
function deleteCondition(id) {
    if (confirm("Are you sure you want to delete this ?")) {
        blockUI();
        var po = { 'id': id };
        $.ajax({
            type: 'POST',
            url: '/Condition/Delete',
            data: JSON.stringify(po),
            contentType: 'application/json',
            success: function (data) {
                if (data) {
                    successToast();
                    getConditionData();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });

    }

}
function deleteLocation(id) {
    if (confirm("Are you sure you want to delete this ?")) {
        blockUI();
        var po = { 'id': id };
        $.ajax({
            type: 'POST',
            url: '/Location/Delete',
            data: JSON.stringify(po),
            contentType: 'application/json',
            success: function (data) {
                if (data) {
                    successToast();
                    getLocationData();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });

    }

}

/******************** Item Unit/Group **********************************/
function showHideAddUnitGroup(ref) {

    if ($(ref).parent().find(".add-div").css('display') == 'none') {
        $(ref).parent().find(".add-div").show("slow");
        $(ref).prop('value', 'HIDE');
        $(".unit-group-tab-div").toggle();

    }
    else {
        $(".unit-group-tab-div").toggle();
        $(ref).parent().find(".add-div").hide("slow");
        $.ajax({
            type: "GET",
            contentType: "html",
            url: '/MeasureUnit/UnitGroupAdd',
            async: true,
            success: function (data) {
                $("#unit-grp-div").html("");
                $("#unit-grp-div").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
        $(ref).prop('value', 'ADD NEW');

    }
}
function getUnitGroupData() {

    $(".unit-group-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/MeasureUnit/UnitGroup',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function editUnitGroup(id) {
    $(".unit-group-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/MeasureUnit/UnitGroupUpdate?id=' + id,
        async: true,
        success: function (data) {
            $("#unit-grp-div").html("");
            $("#unit-grp-div").html(data);
            $("#unit-grp-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#unit-grp-div").show("slow");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function deleteUnitGroup(id) {
    if (confirm("Are you sure you want to delete this ?")) {
        blockUI();
        var po = { 'id': id };
        $.ajax({
            type: 'POST',
            url: '/MeasureUnit/UnitGroupDelete',
            data: JSON.stringify(po),
            contentType: 'application/json',
            success: function (data) {
                if (data) {
                    successToast();
                    getUnitGroupData();
                }
                else {
                    errorToast();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });

    }

}

function showHideAddItemUnit(ref) {

    if ($(ref).parent().find(".add-div").css('display') == 'none') {
        $(ref).parent().find(".add-div").show("slow");
        $(ref).prop('value', 'HIDE');
        $(".unit-tab-div").toggle();

    }
    else {
        $(".unit-tab-div").toggle();
        $(ref).parent().find(".add-div").hide("slow");
        $.ajax({
            type: "GET",
            contentType: "html",
            url: '/MeasureUnit/ItemUnitAdd',
            async: true,
            success: function (data) {
                $("#unit-div").html("");
                $("#unit-div").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
        $(ref).prop('value', 'ADD NEW');

    }
}
function getItemUnitData() {
    $(".unit-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/MeasureUnit/ItemUnit',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function editItemUnit(id) {
    $(".unit-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/MeasureUnit/ItemUnitUpdate?id=' + id,
        async: true,
        success: function (data) {
            $("#unit-div").html("");
            $("#unit-div").html(data);
            $("#unit-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#unit-div").show("slow");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function deleteItemUnit(id) {
    if (confirm("Are you sure you want to delete this ?")) {
        blockUI();
        var po = { 'id': id };
        $.ajax({
            type: 'POST',
            url: '/MeasureUnit/ItemUnitDelete',
            data: JSON.stringify(po),
            contentType: 'application/json',
            success: function (data) {
                if (data) {
                    successToast();
                    getItemUnitData();
                }
                else {
                    errorToast();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });

    }

}

function addNewRowUom() {
    var rowCount = parseInt($('#group-uoms >tbody >tr').length);
    var row = "<tr>";
    row += "<td> <input type='text' name='Group.pUnits[" + rowCount + "].Name' class='form-control' required />";
    row += "<td><input type='number' class='form-control' name='Group.pUnits[" + rowCount + "].BaseUnitQunatity' required value='1' /></td>";
    row += "<td><a href='#' onclick='removeRowUom(this)'><i class='fa fa-trash fa-fw'></i></a></td>";
    row += "</tr>";
    $('#group-uoms >tbody').append(row);

}

function removeRowUom(ref) {
    $(ref).parent().parent().remove();
}

/************************  Items **********************************/

function addItem(ref) {

    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Item/Create',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            scrollTo("main-content");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(jqXHR.status);
        }
    });
}
function editItem(id) {
    $(".Item-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Item/Update?id=' + id,
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            $("#item-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#item-div").show("slow");
            scrollTo("main-content");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(jqXHR.status);
        }
    });
}
function editItemBarcodesAndPrices(id) {
    $(".Item-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Item/ItemBarcodeAndPricesEdit?id=' + id,
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            scrollTo("main-content");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(jqXHR.status);
        }
    });
}
function editItemImeiCodes(id) {
    $(".Item-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Item/ItemImeiCodesEdit?id=' + id,
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            scrollTo("main-content");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(jqXHR.status);
        }
    });
}
function deleteItem(id) {
    if (confirm("Are you sure you want to delete this ?")) {
        blockUI();
        var data = { 'id': id };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: '/Item/Delete',
            async: false,
            data: JSON.stringify(data),
            success: function (data) {
                if (!data) {
                    unblockUI();
                    return $().toastmessage('showToast', {
                        text: 'Quanity of item must be 0 before you delete it.',
                        sticky: false,
                        position: 'bottom-right',
                        type: 'error'

                    });
                }
                var grid = $("#itemsGrid").data("kendoGrid");
                var currentPage = grid.dataSource.page();
                successToast();
                getItemData(currentPage);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
    }

}
function getItemData(page) {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Item/Index',
        async: false,
        success: function (data) {
            
            $("#main-content").html("");
            $("#main-content").html(data);
            if (page) {
                var grid = $("#itemsGrid").data("kendoGrid");
                grid.dataSource.query({ page: page, pageSize: 10 });
            }
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getItemBarcodeData() {
    $(".Item-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Barcode/BarcodeList',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
/************************  Import **********************************/
function getImportData()
{
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Import/Index',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            scrollTo("main-content");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(jqXHR.status);
        }
    });
}
function getImportInventory() {

    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Import/Inventory',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(jqXHR.status);
        }
    });
}

/************************  Services **********************************/
function addServices(ref) {

    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Services/Create',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            scrollTo("main-content");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            debugger
            handleErrors(jqXHR.status);
        }
    });
}
function editService(id) {
    $(".Item-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Services/Update?id=' + id,
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            $("#Service-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#Service-div").show("slow");
            scrollTo("main-content");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(jqXHR.status);
        }
    });
}
function getServicesData() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Services/Index',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function deleteService(id) {
    if (confirm("Are you sure you want to delete this ?")) {
        blockUI();
        var data = { 'id': id };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: '/Services/Delete',
            async: false,
            data: JSON.stringify(data),
            success: function (data) {
                if (!data) {
                    unblockUI();
                    return $().toastmessage('showToast', {
                        text: 'Please Try Again',
                        sticky: false,
                        position: 'bottom-right',
                        type: 'error'

                    });
                }
                successToast();
                getServicesData();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
    }

}
/************************  Quotation **********************************/

function showHideAddQuotation(ref) {

    if ($(ref).parent().find(".add-div").css('display') == 'none') {
        $(ref).parent().find(".add-div").show("slow");
        $(ref).prop('value', 'HIDE');
        $(".quotation-tab-div").toggle();
    }
    else {
        $(".quotation-tab-div").toggle();
        $(ref).parent().find(".add-div").hide("slow");
        $.ajax({
            type: "GET",
            contentType: "html",
            url: '/Quotation/Create',
            async: true,
            success: function (data) {
                $("#quo-div").html("");
                $("#quo-div").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
        $(ref).prop('value', 'ADD NEW');

    }
}
function editQuote(id) {
    $(".quotation-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Quotation/Update?id=' + id,
        async: true,
        success: function (data) {
            $("#quo-div").html("");
            $("#quo-div").html(data);
            $("#quo-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#quo-div").show("slow");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function deleteQuote(id) {
    if (confirm("Are you sure you want to delete this ?")) {
        blockUI();
        var data = { 'id': id };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: '/Quotation/Delete',
            async: false,
            data: JSON.stringify(data),
            success: function (data) {
                if (data == "true") {
                    successToast();
                    getQuotations();
                }
                else {

                    unblockUI();
                    return $().toastmessage('showToast', {
                        text: data,
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
}
function getQuotations() {
    $(".quotation-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Quotation/Index',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

/************************ Purchase Order *****************************/

function showHideAddPurchaseOrder(ref) {

    if ($(ref).parent().find(".add-div").css('display') == 'none') {
        $(ref).parent().find(".add-div").show("slow");
        $(ref).prop('value', 'HIDE');
        $(".PO-tab-div").toggle();
    }
    else {
        $(".PO-tab-div").toggle();
        $(ref).parent().find(".add-div").hide("slow");
        $.ajax({
            type: "GET",
            contentType: "html",
            url: '/PurchaseOrder/Create',
            async: true,
            success: function (data) {
                $("#quo-div").html("");
                $("#quo-div").html(data);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
        $(ref).prop('value', 'ADD NEW');
    }
}

function editPurchaseOrder(id) {
    $(".PO-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/PurchaseOrder/Update?id=' + id,
        async: true,
        success: function (data) {
            $("#quo-div").html("");
            $("#quo-div").html(data);
            $("#quo-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#quo-div").show("slow");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function deletePurchaseOrder(id) {
    if (confirm("Are you sure you want to delete this ?")) {
        blockUI();
        var data = { 'id': id };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: '/PurchaseOrder/Delete',
            async: false,
            data: JSON.stringify(data),
            success: function (data) {
                if (data == "true") {
                    successToast();
                    getPurchaseOrder();
                }

                else {
                    unblockUI();
                    return $().toastmessage('showToast', {
                        text: data,
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
}
function returnPurchaseOrder(id) {
    if (confirm("Are you sure you want to return this order ?")) {
        blockUI();
        var data = { 'id': id };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: '/PurchaseOrder/ReturnPO',
            async: false,
            data: JSON.stringify(data),
            success: function (data) {
                successToast();
                getPurchaseOrder();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
    }
}
function getPaymentHistory() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/PurchaseOrder/PaymentsHistory',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getAddPayment() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Sale/AddCustomerPayment',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getSaleHistory() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Sale/PaymentsHistory',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function addSupplierPayment() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/PurchaseOrder/AddSupplierPayment',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function addPOPayments() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/PurchaseOrder/AddPOPayments',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getCompletedPO() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/PurchaseOrder/CompletedPO',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getPendingPO() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/PurchaseOrder/PendingPO',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getPurchaseOrder() {
    $(".PO-tab-div").show();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/PurchaseOrder/Index',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

/************************  Supplier **********************************/

function showHideAddSupplier(ref) {

    if ($(ref).parent().find(".add-div").css('display') == 'none') {
        $(ref).parent().find(".add-div").show("slow");
        $(ref).prop('value', 'HIDE');
        $(".supplier-tab-div").toggle();
    }
    else {
        $(".supplier-tab-div").toggle();
        $(ref).parent().find(".add-div").hide("slow");
        $.ajax({
            type: "GET",
            contentType: "html",
            url: '/Supplier/Create',
            async: true,
            success: function (data) {
                $("#user-div").html("");
                $("#user-div").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
        $(ref).prop('value', 'ADD NEW');

    }
}
function getSuppliers() {
    $(".supplier-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Supplier/Index',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function editSupplier(id) {
    $(".supplier-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Supplier/Update?id=' + id,
        async: true,
        success: function (data) {
            $("#sup-div").html("");
            $("#sup-div").html(data);
            $("#sup-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#sup-div").show("slow");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function deleteSupplier(id) {
    if (confirm("Are you sure you want to delete this ?")) {
        blockUI();
        var po = { 'id': id };
        $.ajax({
            type: 'POST',
            url: '/Supplier/Delete',
            data: JSON.stringify(po),
            contentType: 'application/json',
            success: function (data) {
                if (data) {
                    successToast();
                    getSuppliers();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
    }

}

/************************  Supplier **********************************/

function showHideAdd(ref) {

    if ($(ref).parent().find(".add-div").css('display') == 'none') {
        $(ref).parent().find(".add-div").show("slow");
        $(ref).prop('value', 'HIDE');
        $(".user-tab-div").toggle();
    }
    else {
        $(".user-tab-div").toggle();
        $(ref).parent().find(".add-div").hide("slow");
        $.ajax({
            type: "GET",
            contentType: "html",
            url: '/User/AddUser',
            async: true,
            success: function (data) {
                $("#user-div").html("");
                $("#user-div").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
        $(ref).prop('value', 'ADD NEW');

    }
}
function getMaintenanceSales() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Sale/Maintenance',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getCreditSales() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Sale/Credit',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getSales() {

    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Sale/Index',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getWishlist() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Barcode/GetWishlist',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getAllSales() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Sale/GetAllSales',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getDueSales() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Sale/SalesDue',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getReturnSales() {

    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Sale/SaleReturn',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getUsers() {
    $(".user-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/User/Index',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function editUser(id) {
    $(".user-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/User/UpdateUser?id=' + id,
        async: true,
        success: function (data) {
            $("#user-div").html("");
            $("#user-div").html(data);
            $("#user-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#user-div").show("slow");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function deleteUser(id) {
    if (confirm("Are you sure you want to delete this ?")) {
        blockUI();
        var data = { 'id': id };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: '/User/DeleteUser',
            async: false,
            data: JSON.stringify(data),
            success: function (data) {

                successToast();
                getUsers();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
    }

}
/************************  End Supplier **********************************/

/************************  Start Transfer **********************************/
function getAllTransferData() {
    //$(".Item-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Transfer/Index',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getAcceptTransferData() {
    //$(".Item-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Transfer/TranferRequestPending',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getCompletedTransferData() {
    //$(".Item-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Transfer/TranferRequestCompleted',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function showHideAddTransfer(ref) {
    if ($(ref).parent().find(".add-div").css('display') == 'none') {
        $(ref).parent().find(".add-div").show("slow");
        $(ref).prop('value', 'HIDE');
        $(".tra-tab-div").toggle();
    }
    else {
        $(".tra-tab-div").toggle();
        $(ref).parent().find(".add-div").hide("slow");
        $.ajax({
            type: "GET",
            contentType: "html",
            url: '/Transfer/Create',
            async: true,
            success: function (data) {
                $("#tra-div").html("");
                $("#tra-div").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
        $(ref).prop('value', 'ADD NEW');

    }
}

function addNewRowTransfer() {
    var rowCount = parseInt($('#Transfer-items >tbody >tr').length);
    var row = "<tr>";
    row += "<td>" + (rowCount + 1) + "</td>";
    row += '<td><input type="text" class="form-control item-search" onchange="getItemDetailByNumber(this)"/></td>';
    row += "<td> <input id='Tr-item-" + rowCount + "'  class='sale-items form-control' />"
            + "<input type='hidden' class='item-id-hdn' name='Transfer.Items[" + rowCount + "].FKItemID' />"
            + "<input type='hidden' class='item-var-id-hdn' name='Transfer.Items[" + rowCount + "].FkItemVariantID' /></td>";
    row += "<td><input type='number' class='form-control sale-item-quantity' onblur='setItemTotalTr(this)' name='Transfer.Items[" + rowCount + "].Quantity' required/></td>";
    row += "<td><input type='number' class='form-control sale-item-price' onchange='setItemTotalTr(this)' readonly/></td>";
    row += "<td><input type='number' class='form-control sale-item-total' name='Sale.pItems[" + rowCount + "].Total' readonly/></td><td><label class='measuring-unit'></label> <span class='prices'></span><span class='image-col'></span> </td><td><a href='#' onclick='removeRowT(this)'><i class='fa fa-trash fa-fw'></i></a></td></tr>";
    $('#Transfer-items >tbody').append(row);
    $("#Tr-item-" + rowCount + "").parent().parent().find(".item-search").focus();
    applyAutoComplete("Tr-item-" + rowCount);
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

function editTransfer(id) {
    $(".tra-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Transfer/Update?id=' + id,
        async: true,
        success: function (data) {
            $("#tra-div").html("");
            $("#tra-div").html(data);
            $("#tra-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#tra-div").show("slow");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function deleteTransfer(id) {

    if (confirm("Are you sure you want to delete this ?")) {
        blockUI();
        var po = { 'id': id };
        $.ajax({
            type: 'POST',
            url: '/Transfer/Delete',
            data: JSON.stringify(po),
            contentType: 'application/json',
            success: function (data) {
                if (data == "true") {

                    successToast();
                    getAllTransferData();
                }
                else {
                    unblockUI();
                    return $().toastmessage('showToast', {
                        text: data,
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

}
function acceptTransfer(id) {
    $(".tra-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Transfer/AcceptTransfer?id=' + id,
        async: true,
        success: function (data) {
            $("#acc-tra-div").html("");
            $("#acc-tra-div").html(data);
            //$("#acc-tra-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#acc-tra-div").show("slow");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
/************************  End Transfer **********************************/
function getReturnSale(id) {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Sale/GetSaleReturn?id=' + id,
        async: true,
        success: function (data) {
            $("#SaleReturn").html("");
            $("#SaleReturn").html(data);
            //$("#acc-tra-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#acc-tra-div").show("slow");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

var xhr;
var select_saleitemunit = [];
var saleItemUnitgroupID = null;
var saleItemUnitID = null;
var saleItemID = null;
function getItemDetailByNumber(ref, row) {
    var itemno = $(ref).val().trim();
    if (!itemno) {
        return false;
    }
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "json",
        url: '/Sale/SearchByItemNo?id=' + itemno,
        async: true,
        success: function (data) {

            unblockUI();
            if (!data) {
                $(ref).parent().parent().find(".sale-items").focus();
                $(ref).parent().parent().find(".sale-items").val("");
                $(ref).parent().parent().find(".item-id-hdn").val("");
                $(ref).parent().parent().find(".item-var-id-hdn").val("");
                $(ref).parent().parent().find(".sale-item-quantity").val("");
                $(ref).parent().parent().find(".sale-item-base-price").val("");
                $(ref).parent().parent().find(".sale-item-price").val("");
                $(ref).parent().parent().find(".sale-item-allowdiscount").val("");
                $(ref).parent().parent().find(".sale-item-discountallowed").val("");
                $(ref).parent().parent().find(".sale-item-discount").val("");
                $(ref).parent().parent().find(".sale-item-istaxable").val("");
                $(ref).parent().parent().find(".sale-item-taxrate").val("");
                $(ref).parent().parent().find(".sale-item-total").val("");
                $(ref).parent().parent().find(".image-col").html("");
                return $().toastmessage('showToast', {
                    text: 'Not Found. Try Product Search',
                    sticky: false,
                    position: 'bottom-right',
                    type: 'error'

                });
            }
            if (select_saleitemunit && select_saleitemunit.length > 0) {
                saleItemUnitgroupID = data.FkUnitGroupID;
                saleItemUnitID = data.FkUnitID;
                saleItemID = data.ItemID;
                select_saleitemunit[row - 1].dataSource.read();
            }
            $(ref).parent().parent().find(".item-search").val(data.ItemNoStr);
            $(ref).parent().parent().find(".sale-items").val(data.Name);
            $(ref).parent().parent().find(".item-id-hdn").val(data.ItemID);
            $(ref).parent().parent().find(".item-var-id-hdn").val(data.ServiceID);
            $(ref).parent().parent().find(".sale-item-base-price").val(data.SalePrice);
            $(ref).parent().parent().find(".sale-item-price").val(data.SalePrice);
            $(ref).parent().parent().find(".sale-item-quantity").val(1);
            $(ref).parent().parent().find(".sale-item-allowdiscount").val(data.AllowedDiscount);
            $(ref).parent().parent().find(".sale-item-discountallowed").val(data.Discount);
            $(ref).parent().parent().find(".sale-item-istaxable").val(data.IsTaxable);
            $(ref).parent().parent().find(".sale-item-taxrate").val(data.TaxRate);
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
function getItemDetailByNumberPO(ref) {
    var itemno = $(ref).val().trim();
    if (!itemno) {
        return false;
    }
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "json",
        url: '/Sale/SearchByItemNo?id=' + itemno,
        async: true,
        success: function (data) {
            unblockUI();
            if (!data) {
                $(ref).parent().parent().find(".sale-items").focus();
                $(ref).parent().parent().find(".sale-items").val("");
                $(ref).parent().parent().find(".item-id-hdn").val("");
                $(ref).parent().parent().find(".item-var-id-hdn").val("");
                $(ref).parent().parent().find(".sale-item-price").val("");
                $(ref).parent().parent().find(".sale-item-quantity").val("");
                $(ref).parent().parent().find(".sale-item-total").val("");
                $(ref).parent().parent().find(".image-col").html("");
                $(ref).parent().parent().find(".measuring-unit").html("");
                return $().toastmessage('showToast', {
                    text: 'Not Found. Try Product Search',
                    sticky: false,
                    position: 'bottom-right',
                    type: 'error'

                });
            }
            $(ref).parent().parent().find(".sale-items").val(data.Name);
            $(ref).parent().parent().find(".item-id-hdn").val(data.ItemID);
            $(ref).parent().parent().find(".item-var-id-hdn").val(data.ItemVarID);
            $(ref).parent().parent().find(".sale-item-price").val(data.PurchaseCost);
            $(ref).parent().parent().find(".sale-item-price-po").val(data.SalePrice);
            $(ref).parent().parent().find(".sale-item-quantity").val(1);
            $(ref).parent().parent().find(".sale-item-total").val(data.PurchaseCost);
            $(ref).parent().parent().find(".sale-item-quantity").focus();
            $(ref).parent().parent().find(".measuring-unit").html(data.MeasuringUnit);
            $(ref).parent().parent().find(".image-col").html("<a href='#' onclick='openSaleImageModal(this)'><i class='fa fa-file-image-o fa-fw'></i></a> <input type='hidden' class='img-src' value='" + data.Image + "'/><input type='hidden' class='img-src1' value='" + data.Image1 + "'/>");


            var tabl = '<table style="font-size: 14px;"><thead><tr style="background-color:#B8D91A;"><th>Name</th><th>Price</th></tr></thead><tbody>';
            tabl += '<tr style="background-color:#97DAF5;"><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">Sale Price</td><td height="40" style="padding:10px;margin:10px;border-spacing: 1em;font-size: 20px;font-weight: bold;">' + data.SalePrice + '</td></tr>';
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
function getExpenseData() {
    $(".condition-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Accounts/Index',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getPurchaseReport() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Reports/Purchase',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getPurchaseTaxReport() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Reports/PurchaseTax',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getSaleReport() {
    debugger
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Reports/Sales',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            debugger
            handleErrors(textStatus);
        }
    });
}

function getFNTSaleReport() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Reports/FNTSales',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            debugger
            handleErrors(textStatus);
        }
    });
}
function getSaleTaxReport() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Reports/SaleTax',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getItemwiseSH()
{
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Reports/ItemWiseSaleHistory',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getItemwiseProfitLoss() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Reports/ItemwiseProfitLoss',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getCustomerReport() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Reports/CustomerLedger',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getSupplierReport() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Reports/SupplierLedger',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getCashDrawerReport() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Reports/CashDrawer',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getTransferReport() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Reports/POTransfer',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getExpenseReport() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Reports/Expense',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getBarcode() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/BarCode/Index',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getInventoryReport() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Reports/Inventory',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getProfitLossStatement() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Reports/ProfitLoss',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getExpenseHeadData() {
    $(".condition-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Accounts/Heads',
        async: true,
        success: function (data) {

            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function showHideAddExpenseHead(ref) {
    if ($(ref).parent().find(".add-div").css('display') == 'none') {
        $(ref).parent().find(".add-div").show("slow");
        $(ref).prop('value', 'HIDE');
        //alert('');
        $(".condition-tab-div").toggle();

    }
    else {
        $(ref).parent().find(".add-div").hide("slow");
        $(".condition-tab-div").toggle();
        $.ajax({
            type: "GET",
            contentType: "html",
            url: '/Accounts/CreateHead',
            async: true,
            success: function (data) {
                $("#con-div").html("");
                $("#con-div").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
        $(ref).prop('value', 'ADD NEW');

    }
}
function showHideAddExpense(ref) {
    if ($(ref).parent().find(".add-div").css('display') == 'none') {
        $(ref).parent().find(".add-div").show("slow");
        $(ref).prop('value', 'HIDE');
        //alert('');
        $(".condition-tab-div").toggle();

    }
    else {
        $(ref).parent().find(".add-div").hide("slow");
        $(".condition-tab-div").toggle();
        $.ajax({
            type: "GET",
            contentType: "html",
            url: '/Accounts/Create',
            async: true,
            success: function (data) {
                $("#con-div").html("");
                $("#con-div").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });
        $(ref).prop('value', 'ADD NEW');

    }
}
function editExpenseHead(id) {
    $(".condition-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Accounts/UpdateHead?id=' + id,
        async: true,
        success: function (data) {
            $("#con-div").html("");
            $("#con-div").html(data);
            $("#con-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#con-div").show("slow");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function editExpense(id) {
    $(".condition-tab-div").toggle();
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Accounts/Update?id=' + id,
        async: true,
        success: function (data) {
            $("#con-div").html("");
            $("#con-div").html(data);
            $("#con-div").parent().find(".custombtn").first().prop('value', 'CANCEL');
            $("#con-div").show("slow");
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function deleteExpenseHead(id) {
    if (confirm("Are you sure you want to delete this ?")) {
        blockUI();
        var po = { 'id': id };
        $.ajax({
            type: 'POST',
            url: '/Accounts/DeleteHead',
            data: JSON.stringify(po),
            contentType: 'application/json',
            success: function (data) {
                if (data) {
                    successToast();
                    getExpenseHeadData();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });

    }
}
function deleteExpense(id) {
    if (confirm("Are you sure you want to delete this ?")) {
        blockUI();
        var po = { 'id': id };
        $.ajax({
            type: 'POST',
            url: '/Accounts/Delete',
            data: JSON.stringify(po),
            contentType: 'application/json',
            success: function (data) {
                if (data) {
                    successToast();
                    getExpenseData();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                handleErrors(textStatus);
            }
        });

    }
}

/************************* Settings **************************/

function getTaxSettingsData() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Config/TaxRateConfig',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function getEmailToCsvData() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Config/EmailToCsvConfig',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function getStoreInformationData() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Config/StoreInformationConfig',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function getBarcodePrintSettingData() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/Config/BarcodePrintConfig',
        async: true,
        success: function (data) {
            $("#main-content").html("");
            $("#main-content").html(data);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}

function blockUI() {
    $(".overlay").show()
}
function unblockUI() {
    $(".overlay").hide();

}
$(".side-menu-container a").click(function () {
    $(".side-menu-container a").removeAttr('style');
    $(this).css('background', '#337AB7');
    $(this).css('color', '#fff');
});


function ImportErrorResponse(response, fileName) {

    errorToast(response.Message);

    var data = 'RowNumber,ErrorMessage';
    $.each(response.Errors, function (index, obj) {
        data += "\n" + obj.Row + "," + obj.ErrorMsg;
    });

    var blob = new Blob([data], {
        type: "text/plain;charset=utf-8"
    });

    saveAs(blob, fileName);
}


var dateTimeFactory = {
    GetDatePickerOptions: function () {
        return {
            min: dateTimeFactory.getNewDate(),
            format: kendo.culture().calendar.patterns.d
        };
    },
    GetDateTimePickerOptions: function () {
        return {
            format: kendo.culture().calendar.patterns.g
        };
    },
    GetTimePickerOptions: function () {
        return {
            format: kendo.culture().calendar.patterns.t
        };
    },
    GetMonthPickerOptions: function () {
        return {
            format: "MMMM",
            start: "year",
            depth: "year"
        };
    },
    GetYearPickerOptions: function () {
        return {
            format: "yyyy",
            start: "decade",
            depth: "decade"
        };
    },
    dateTimeFormat: function (n) {
        return n === null ? "" : kendo.toString(n, kendo.culture().calendar.patterns.g)
    },
    dateFormat: function (n) {
        return n === null ? "" : kendo.toString(n, kendo.culture().calendar.patterns.d)
    },
    dateMonthFormat: function (n) {
        return n === null ? "" : kendo.toString(n, kendo.culture().calendar.patterns.m)
    },
    dateYearFormat: function (n) {
        return n === null ? "" : kendo.toString(n, kendo.culture().calendar.patterns.m)
    },
    timeFormat: function (n) {
        return n === null ? "" : kendo.toString(n, kendo.culture().calendar.patterns.t)
    },
    toDateObject: function (date) {
        return date === null ? null : new Date(date);
    },
    getNewDate: function () {
        return new Date();
    },
}

$(window).keydown(function (event) {

    // Check: ENTER key pressed
    if (event.key === "Enter") {

        // Check: element itself has class or contains class
        if ($(event.target).hasClass("sale-items") ||
            $(event.target).closest(".sale-items").length > 0) {

            addNewRowImeiNumber($("#ItemID_for_Imei").val());
            return false;
        }
    }
});
function addNewRowImeiNumber(itemId) {
    var rowCount = parseInt($('#item-imeicodes >tbody >tr').length);
    var row = "<tr>";
    row += "<td>" + (rowCount + 1) + "</td>";
    row += "<td> <input type='text' name='ItemImeiCodes[" + rowCount + "].ImeiCode' class='sale-items form-control' />"
        + "<input type='hidden' class='item-id-hdn' name='ItemImeiCodes[" + rowCount + "].FkItemID' value='" + itemId + "' />"
        + "</td>";
    row += "<td><input type='text' readonly='true' class='form-control' value='No'/></td>";
    row += "<td><a href='#' onclick='removeRowImei(this)'><i class='fa fa-trash fa-fw'></i></a></td></tr>";
    $('#item-imeicodes >tbody').append(row);

    $('#item-imeicodes tr:last-child').find('.sale-items').focus();
}
function removeRowImei(_this) {
    $(_this).closest('tr').remove();
}