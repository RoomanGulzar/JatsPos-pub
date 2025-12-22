
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

function getNewRepairOrderModel() {
    return {
        Id: kendo.guid(),
        Date: new Date(),
        Services: [],
        SubTotal: 0,
        Total: 0
    };
}

function getNextOrderNumber() {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/CustomerRepair/GetNextOrderNumber',
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

function refreshPage() {
    repairOrderModel = getNewRepairOrderModel();
    $("#repairOrderCustomerName").val("");
    $("#repairOrderCustomerPhone").val("");
    $("#repairOrderCustomerEmail").val("");
    $("#repairOrderAccessoriesLeft").val("");
    $("#repairOrderProblemDescription").val("");
    getNextOrderNumber();
}


var repairOrderModel = {
    Id: kendo.guid(),
    Date: new Date(),
    CustomerName: "",
    CustomerPhone: "",
    CustomerEmail: "",
    Services: [],
    SubTotal: 0,
    Total: 0
};

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

function setOrderType(orderType) {
    repairOrderModel.OrderType = orderType;
    $("#orderType").val(repairOrderModel.OrderType);
}

function setRepairOrderCustomerEmail(email) {
    repairOrderModel.CustomerEmail = email.value;
}


function setRepairOrderDeviceInfo(email) {
    repairOrderModel.Model = email.value;
}

function setRepairOrderDevicePassword(email) {
    repairOrderModel.Password = email.value;
}
function setRepairOrderAccessoriesLeft(email) {
    repairOrderModel.AccessoriesLeft = email.value;
}

function setRepairOrderProblemDescription(email) {
    repairOrderModel.ProblemDescription = email.value;
}

function setRepairOrderComments(comments) {
    repairOrderModel.Comments = comments.value;
}

function setRepairOrderCustomerName(name) {
    repairOrderModel.CustomerName = name.value;
}

function setRepairOrderCustomerPhone(phone) {
    repairOrderModel.CustomerPhone = phone.value;
}

function closePaymentWindow() {
    keyPressBeep();
    var win = $("#paymentWindow").data("kendoWindow");
    win.close();
}

function UpdateCustomerInfoScreen(id) {
    blockUI();
    $.ajax({
        type: "GET",
        contentType: "html",
        url: '/CustomerRepair/UpdateCutomerInfo?id=' + id,
        async: true,
        success: function (data) {
            $("#update_customer_info_screen").html("");
            $("#update_customer_info_screen").html(data);
            switchUpdateCustomerInfoScreen(true);
            unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            handleErrors(textStatus);
        }
    });
}
function switchUpdateCustomerInfoScreen(showSales) {
    keyPressBeep();
    if (showSales) {
        $(".not_main_screen").slideUp();
        $("#update_customer_info_screen").slideDown();
        $("#main_screen").slideUp();
    } else {
        $("#update_customer_info_screen").slideUp();
        $("#main_screen").slideDown();
    }
}

function updateCustomerInfo() {
    keyPressBeep();

    var customerName = $("#repairOrderCustomerName").val();

    if (!customerName) {
        $("#repairOrderCustomerName").focus();
        return $().toastmessage('showToast', {
            text: "Please add your name",
            sticky: false,
            position: 'bottom-right',
            type: 'error'
        });
    }

    var customerPhone = $("#repairOrderCustomerPhone").val();

    if (!customerPhone) {
        $("#repairOrderCustomerPhone").focus();
        return $().toastmessage('showToast', {
            text: "Please add your phone number",
            sticky: false,
            position: 'bottom-right',
            type: 'error'
        });
    }
    debugger;
    var customerSignature = $("#repairOrderCustomerSignature").val();
    if (!customerSignature) {
        return $().toastmessage('showToast', {
            text: "Please draw your signatures",
            sticky: false,
            position: 'bottom-right',
            type: 'error'
        });
    }

    repairOrderModel.CustomerSignatures = customerSignature;

    blockUI();

    $.ajax({
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        url: '/CustomerRepair/UpdateCutomerInfo',
        data: JSON.stringify({ RepairOrder: repairOrderModel }),
        async: true,
        success: function (msg) {
            if (msg.saleid && msg.saleid !== "00000000-0000-0000-0000-000000000000") {
                //$('#repairOrderid').val(msg.repairOrderid);
                //closePaymentWindow();
                //refreshPage();
                notificationHub.server.reloadRepairOrders();
                window.location.href = "/CustomerRepair";
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