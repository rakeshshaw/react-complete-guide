var admin = {
  initialization: async function () {
    await backend.insertData("#adminContainer", "view/admin.html");

    //check if it's super admin or simple admin and display the proper tabs
    var template = [
      backend.insertData(
        "#delegateAccessControl",
        "view/delegateAccessControl.html"
      ),
      backend.insertData("#viewsAccessControl", "view/viewAccessControl.html"),
      backend.insertData(
        "#searchResourceContainer",
        "view/searchResource.html"
      ),
    ];
    var tabs = Cookies.get("role").split(",");

    if (tabs.indexOf("IS_SUPER_ADMIN") > -1) {
      template.push(
        backend.insertData(
          "#managementChaining",
          "view/adminManagementChaining.html"
        )
      );
      template.push(backend.insertData("#backups", "view/backups.html"));
      template.push(backend.insertData("#taxonomy", "view/taxonomy.html"));
    } else {
      $("#ibm-primary-tabs li").eq(3).hide();
      $("#ibm-primary-tabs li").eq(4).hide();
      $("#ibm-primary-tabs li").eq(5).hide();
    }
    await Promise.all(template);

    $("#adminContainer").on("click", ".export_to_excel", async function () {
      let $clickedButtonId = $(this).context.id;
      let partUrl = $clickedButtonId.split("_")[3];
      let fObj = {
        status: [],
        fundingBu: [],
        fundingSource: [],
        beneficiaryLevel: [],
        beneficiaryGeo: [],
        beneficiaryMarket: [],
        beneficiaryCountry: [],
        country: [],
        city: [],
        discipline: [],
        diamondTeam: [],
        msc: [],
        employeeType: [],
        month: [],
        year: [],
        localManagers: [],
        globalManagers: [],
        functionalManagers: [],
      };
      let url = "export/excel/" + partUrl;
      $("#pleaseWait").show();
      cf.exportToExcelCall(url, fObj, "POST", "TRB_" + partUrl);
    });

    //trigger  secondary tabs
    $("#ibm-primary-tabs li a").click(function () {
      var idContainer = $(this).attr("data-container");
      $("#ibm-primary-tabs li a").attr("aria-selected", false);
      $(this).attr("aria-selected", true);
      admin.secondaryTabActions(idContainer);
    });

    //trigger remove
    $(".adminSecondaryContainer").on("click", " a.removeUser", function () {
      var container = $(this).closest(".adminSecondaryContainer").attr("id");
      cf.showOverlay("Delete", "Are you sure you want to delete this user?");
      $("#alertOverlay .ibm-btn-pri").addClass("delete" + container);
      $("#alertOverlay .ibm-btn-pri").attr(
        "data-delete",
        $(this).closest("tr").attr("data-id")
      );

      if (container == "delegateAccessControl")
        $("#alertOverlay .ibm-btn-pri").attr(
          "data-managerId",
          $(this).closest("tr").attr("data-managerId")
        );
    });

    $('#ibm-primary-tabs li a[aria-selected="true"]').trigger("click");
  },
  secondaryTabActions: function (idToShow) {
    $(".adminSecondaryContainer").hide();
    $("#" + idToShow).show();
    var adminTable = "#" + idToShow + "Table";

    let selectedTable =
      adminTable === "#taxonomyTable" ? "#taxonomyDisciplineTable" : adminTable;

    if ($.fn.DataTable.isDataTable($(selectedTable))) {
      $(selectedTable).DataTable().ajax.reload();
    } else {
      // if (idToShow !== "taxonomy")
      window[idToShow].start();
      // else window[idToShow].initialization();
    }
  },
};

var delegateAccessControl = {
  start: function () {
    $("#pleaseWait").show();
    cf.typeaheadPopulate(
      "#delegateDelegate",
      "search/user/findActiveUsersByNameOrMail",
      "Add Delegate",
      false
    );
    cf.typeaheadPopulate(
      "#delegateManager",
      "search/user/findActiveManagersOrTopTierUsersByNameOrMail",
      "Add Manager",
      true
    );

    //create and populate table
    var optionalSettingsObject = {
      autoWidth: false,
      deferRender: "true",
      order: [[2, "desc"]],
      createdRow: function (row, data, dataIndex) {
        $(row).attr("data-id", data.cnum);
        $(row).attr("data-managerId", data.delegateFor.uid);
      },
      columnDefs: [
        {
          targets: 0,
          orderable: false,
        },
        {
          targets: 3,
          visible: false,
        },
        {
          orderData: [3],
          targets: [2],
        },
      ],
      columns: [
        { data: "img" },
        { data: "notesId" },
        { data: "joiningDate" },
        { data: "timestamp" },
        { data: "validate" },
        { data: "delegateFor.nameFull" },
        { data: "delegateFor.mail" },
        { data: "entireChaining" },
        { data: "canPlanData" },
        { data: "action" },
      ],
      ajax: {
        url: "admin/table/delegates?cnum=" + Cookies.get("loginCnum"),
        beforeSend: function (xhr, settings) {
          xhr.setRequestHeader(
            "Authorization",
            "Bearer " + Cookies.get("token")
          );
        },
        dataSrc: function (data) {
          for (var i = 0; i < data.delegateResources.length; i++) {
            var x =
              "https://unified-profile-api.us-south-k8s.intranet.ibm.com/v3/image/" +
              data.delegateResources[i].cnum;
            var img =
              "<img src='" +
              x +
              "' onerror='this.onerror=null; this.src=\"images/profile.jpg\";'>";
            data.delegateResources[i].img = img;
            data.delegateResources[i].action =
              '<p class="ibm-ind-link"><a class="ibm-delete-link removeUser" href="#admin">Remove</a></p>';
            var formatDate = new Date();

            var current_day = formatDate.getDate();
            if (current_day < 10) {
              current_day = "0" + current_day;
            }
            var current_month = formatDate.getMonth() + 1;
            if (current_month < 10) {
              current_month = "0" + current_month;
            }
            var current_year = formatDate.getFullYear();
            var currentDate =
              current_year + "-" + current_month + "-" + current_day;

            if (data.delegateResources[i].validate != currentDate) {
              data.delegateResources[i].validate =
                '<p class="validateCol"><button class="ibm-btn-pri ibm-btn-blue-50 ibm-btn-small validateButton" data-delegate-cnum="' +
                data.delegateResources[i].cnum +
                '" data-manager-cnum="' +
                data.delegateResources[i].delegateFor.uid +
                '">Validate</button></p>';
            }
          }
          $("#pleaseWait").hide();
          return data.delegateResources;
        },
      },
    };
    IBMCore.common.widget.datatable.init(
      "#delegateAccessControlTable",
      optionalSettingsObject
    );
    cf.datatabelSearchLength("#delegateAccessControlTable");
    IBMCore.common.widget.selectlist.init(
      "#delegateAccessControlTable_length select"
    );

    cf.simpleCanSaveSelect("#delegateAccessControl .ibm-fluid", "#delegateAdd");

    $("#delegateAccessControlTable").on(
      "click",
      ".validateButton",
      async function (e) {
        var userCnum = $(this).data("delegate-cnum");
        var managerCnum = $(this).data("manager-cnum");
        await backend.getInfo(
          "user/operation/delegation/update/" + userCnum + "/" + managerCnum,
          "PUT"
        );
        $("#delegateAccessControlTable").DataTable().ajax.reload(null, false);
      }
    );

    //trigger add delegate button
    $("#delegateAdd").click(function (e) {
      $("#alertOverlay .ibm-btn-pri").addClass("addDelegate");
      cf.showOverlay("Add", "Are you sure you want to add this user?");
    });

    //trigger add button from overlay
    $("#alertOverlay").on("click", ".addDelegate", async function (e) {
      $("#pleaseWait").show();
      var info = {
        delegateCnum: $("#delegateDelegate").val(),
        forCnums: $("#delegateManager").val(),
        canPlanData: $("#delegatePlan").prop("checked"),
        entireChaining: $("#fetchChaining").prop("checked"),
      };
      await backend.processInfo("user/operation/delegation/add", "PUT", info);
      $("#delegateAccessControlTable").DataTable().ajax.reload();
      $("#alertOverlay .ibm-btn-sec").trigger("click");
      $("#delegateManager").val(null).trigger("change");
      $("#delegateDelegate").empty();
      $("#fetchChaining").attr("checked", false);
      $("#delegatePlan").attr("checked", false);
      $("#pleaseWait").hide();
    });

    //trigger delete button from overlay
    $("#alertOverlay").on(
      "click",
      ".deletedelegateAccessControl",
      async function (e) {
        var url =
          "user/operation/delegation/remove?delegateCnum=" +
          $("#alertOverlay .ibm-btn-pri").attr("data-delete") +
          "&forCnum=" +
          $("#alertOverlay .ibm-btn-pri").attr("data-managerId");
        await backend.getInfo(url, "DELETE");
        $("#delegateAccessControlTable").DataTable().ajax.reload();
        $("#alertOverlay .ibm-btn-pri").removeAttr(
          "data-delete data-managerId"
        );
        $("#alertOverlay .ibm-btn-sec").trigger("click");
      }
    );
  },
};

var viewsAccessControl = {
  start: function () {
    $("#pleaseWait").show();
    $.when(
      $.getScript("js/genTree1.js"),
      $.getScript("js/viewAccessControl.js"),
      $.Deferred(function (deferred) {
        $(deferred.resolve);
      })
    ).done(function () {
      $("#pleaseWait").hide();
    });
  },
};

var managementChaining = {
  start: function () {
    $("#pleaseWait").show();
    cf.typeaheadPopulate(
      "#addTopTier",
      "https://unified-profile-search-service.us-south-k8s.intranet.ibm.com/search?searchConfig=optimized_search&rows=24&timeout=2000",
      "Add Top Tier Resource",
      false
    );

    //create and populate table
    var optionalSettingsObject = {
      autoWidth: false,
      deferRender: "true",
      order: [[1, "asc"]],
      createdRow: function (row, data, dataIndex) {
        $(row).attr("data-id", data.cnum);
      },
      columnDefs: [
        {
          targets: 0,
          orderable: false,
        },
        {
          targets: 3,
          visible: false,
        },
        {
          orderData: [3],
          targets: [2],
        },
      ],
      columns: [
        { data: "img" },
        { data: "notesId" },
        { data: "joiningDate" },
        { data: "timestamp" },
        { data: "action" },
      ],
      ajax: {
        url: "superadmin/table/topTiers?cnum=" + Cookies.get("loginCnum"),
        beforeSend: function (xhr, settings) {
          xhr.setRequestHeader(
            "Authorization",
            "Bearer " + Cookies.get("token")
          );
        },
        dataSrc: function (data) {
          for (var i = 0; i < data.topTierResources.length; i++) {
            var x =
              "https://unified-profile-api.us-south-k8s.intranet.ibm.com/v3/image/" +
              data.topTierResources[i].cnum;
            var img =
              "<img src='" +
              x +
              "' onerror='this.onerror=null; this.src=\"images/profile.jpg\";'>";
            data.topTierResources[i].img = img;
            data.topTierResources[i].action =
              '<p class="ibm-ind-link"><a class="ibm-delete-link removeUser" href="#admin">Remove</a></p>';
          }
          $("#pleaseWait").hide();
          return data.topTierResources;
        },
      },
    };
    IBMCore.common.widget.datatable.init(
      "#managementChainingTable",
      optionalSettingsObject
    );
    cf.datatabelSearchLength("#managementChainingTable");
    IBMCore.common.widget.selectlist.init(
      "#managementChainingTable_length select"
    );

    //trigger typeahead
    $("#addTopTier").on("select2:select", async function (event) {
      $("#pleaseWait").show();
      $("#addTopTier").attr("data-cnum", event.params.data.id);
      var idSelect = { uid: event.params.data.id };

      await backend
        .processInfo("superadmin/add/topTier", "PUT", idSelect)
        .then(function (value) {
          $("#pleaseWait").hide();
          if (value.alreadyTopTier == true) {
            cf.showOverlay("Error", "This resouce is already Top Tier");
            $("#alertOverlay .ibm-btn-pri").hide();
          } else if (value.message == "Already in database.") {
            cf.showOverlay(
              "Attention",
              "This resouce is already in database with top tier manager: " +
                value.topTierManager.notesId +
                ". Are you sure you want proceed with this action?"
            );
            $("#alertOverlay .ibm-btn-pri").addClass("addAlreadyTopTier");
          } else {
            cf.showOverlay(
              "Operation successfull",
              "The resource has been successfully added"
            );
            $("#alertOverlay .ibm-btn-pri").hide();
            $("#managementChainingTable").DataTable().ajax.reload();
          }
        });
      $("#addTopTier").empty();
    });

    //trigger sync
    $("#managementChainingSync").click(function () {
      cf.showOverlay(
        "Attention",
        "This operation may take some time. Are you sure you want to continue?"
      );
      $("#alertOverlay .ibm-btn-pri").addClass("syncNow");
    });

    //add if already top tier
    $("#alertOverlay").on("click", ".addAlreadyTopTier", async function (e) {
      var idSelect = { uid: $("#addTopTier").attr("data-cnum") };
      await backend.processInfo(
        "superadmin/add/topTier?forced=true",
        "PUT",
        idSelect
      );
      $("#managementChainingTable").DataTable().ajax.reload();
      $("#addTopTier").empty();

      cf.showOverlay(
        "Operation successfull",
        "The resource has been successfully added"
      );
      $("#alertOverlay .ibm-btn-pri").hide();
    });

    //trigger delete button from overlay
    $("#alertOverlay").on(
      "click",
      ".deletemanagementChaining",
      async function (e) {
        await backend.getInfo(
          "superadmin/remove/topTier?cnum=" +
            $("#alertOverlay .ibm-btn-pri").attr("data-delete"),
          "DELETE"
        );
        $("#managementChainingTable").DataTable().ajax.reload();
        $("#alertOverlay .ibm-btn-pri").removeAttr("data-delete");
        $("#alertOverlay .ibm-btn-sec").trigger("click");
      }
    );

    //trigger syncNow button from overlay
    $("#alertOverlay").on("click", ".syncNow", async function (e) {
      $("#pleaseWait").show();
      $("#alertOverlay .ibm-btn-sec").trigger("click");
      await backend
        .getInfo("superadmin/sync/topTiers/" + Cookies.get("loginCnum"), "POST")
        .then(function (value) {
          $("#pleaseWait").hide();
          if (value.type != "NOT_RUNNING") {
            setTimeout(function () {
              cf.showOverlay(
                "Attention",
                "Sync has already been started by " +
                  value.user.nameFull +
                  " <" +
                  value.user.mail +
                  "> on " +
                  value.startDateAndTime
              );
              $("#alertOverlay button.ibm-btn-pri").hide();
            }, 300);
          } else {
            $("#managementChainingTable").DataTable().ajax.reload();
          }
        });
    });
  },
};

var searchResourceContainer = {
  start: async function () {
    cf.typeaheadPopulate(
      "#searchResourceInput",
      "general/resources/trace/find",
      "Select Resource",
      false
    );

    $("#searchResourceContainer").on(
      "click",
      ".allExports button.ibm-btn-pri",
      async function (event) {
        $("#pleaseWait").show();
        var fObj = {
          status: [],
          fundingBu: [],
          fundingSource: [],
          beneficiaryLevel: [],
          beneficiaryGeo: [],
          beneficiaryMarket: [],
          beneficiaryCountry: [],
          country: [],
          city: [],
          discipline: [],
          diamondTeam: [],
          msc: [],
          employeeType: [],
          month: [],
          year: [],
          localManagers: [],
          globalManagers: [],
          functionalManagers: [],
        };
        var linksForExport = [
          "export/excel/" +
            Cookies.get("loginCnum") +
            "/-2/-1/actual/allCurrent ",
          "export/excel/userstats",
          "export/excel/" + Cookies.get("loginCnum") + "/-2/-1/actual/allins",
          "export/excel/" + Cookies.get("loginCnum") + "/-2/-1/actual/allouts",
          "export/excel/" +
            Cookies.get("loginCnum") +
            "/-2/-1/actual/allnotinorg",
          "export/excel/" +
            Cookies.get("loginCnum") +
            "/-2/-1/actual/allactives",

          "export/excel/" + Cookies.get("loginCnum") + "/-2/-1/actual/ins",
          "export/excel/" + Cookies.get("loginCnum") + "/-2/-1/actual/outs",
          "export/excel/" + Cookies.get("loginCnum") + "/-2/-1/actual/notInOrg",
          "export/excel/active/" + Cookies.get("loginCnum") + "/-2/-1/actual",
        ];
        var nrElement = $(".allExports button.ibm-btn-pri").index(this);
        cf.exportToExcelCall(
          linksForExport[nrElement],
          fObj,
          "POST",
          $(this).text()
        );
      }
    );

    $("#searchResourceInput").on("select2:select", async function (event) {
      $("#searchResourceInput").attr("data-name", event.params.data.name);
      $("#searchResourceInput").attr("data-cnum", event.params.data.id);
      $("#pleaseWait").show();
      $("#searchResourceContainer .editUserAdmin a").removeClass(
        "disabledLink"
      );
      if (!$.fn.DataTable.isDataTable($("#searchResourceResult1"))) {
        alert(event.params.data.id);
        searchResourceContainer.initTable1(event.params.data.id);
        searchResourceContainer.initTable2(event.params.data.id);
        $(".searchResoruceTable").show();
      } else {
        alert("else");
        $("#searchResourceResult1")
          .DataTable()
          .ajax.url("admin/trace/user/" + event.params.data.id)
          .load();
        $("#searchResourceResult2")
          .DataTable()
          .ajax.url("admin/trace/auditchanges/" + event.params.data.id)
          .load();
      }
    });

    $("#searchResourceContainer").on(
      "click",
      ".ibm-col-12-1.editUserAdmin a",
      function (event) {
        details.currentCnum = $("#searchResourceInput").attr("data-cnum");
        $("#adminContainer").hide();
        $("#pleaseWait").show();
        alert("details.currentCnum" + details.currentCnum);
        details.openUserDetails(details.currentCnum, "userEdit");
      }
    );
  },

  initTable1: function (cnum) {
    $("#searchResourceResult1 .detailsNQ1Label").append(
      " " + new Date().getFullYear()
    );
    $("#searchResourceResult1 .detailsNQ2Label").append(
      " " + (new Date().getFullYear() + 1)
    );
    var optionalSettingsObject = {
      responsive: true,
      deferRender: "true",
      order: [[0, "desc"]],
      columnDefs: [
        {
          targets: 0,
          visible: false,
        },
        {
          orderData: [0],
          targets: [2],
        },
      ],
      columns: [
        { data: "timestamp" },
        { data: "notesId" },
        { data: "yearMonth" },
        { data: "isActive" },
        { data: "inOrg" },
        { data: "isNewfound" },
        { data: "globalManager" },
        { data: "globalManagerCnum" },
        { data: "globalManagerMail" },
        { data: "globalManagerNotesId" },
        { data: "actualFte" },
        { data: "afterConversionCnum" },
        { data: "auditHistoryId" },
        { data: "beneficiary" },
        { data: "beneficiaryCountry" },
        { data: "beneficiaryGeo" },
        { data: "beneficiaryLevel" },
        { data: "beneficiaryMarket" },
        { data: "beneficiaryRegion" },
        { data: "beneficiarySubLevel" },
        { data: "budgetDeployment" },
        { data: "building" },
        { data: "city" },
        { data: "comments" },
        { data: "country" },
        { data: "createdBy" },
        { data: "createdDate" },
        { data: "dateOfJoining" },
        { data: "dateOfLeaving" },
        { data: "departmentCode" },
        // { data: "diamondTeam" }, // replaced by Team and Conversation
        // { data: "theme" },
        { data: "conversation" },
        { data: "budgetType" },
        { data: "discipline" },
        { data: "division" },
        { data: "employeeType" },
        { data: "floor" },
        { data: "functionalManager" },
        { data: "functionalManagerCnum" },
        { data: "functionalManagerEmail" },
        { data: "functionalManagerNotesId" },
        { data: "fundingBu" },
        { data: "fundingSource" },
        { data: "icaFunded" },
        { data: "isCurrent" },
        { data: "isExecutive" },
        { data: "isGroup" },
        { data: "isInBluepages" },
        { data: "isManager" },
        { data: "isRm" },
        { data: "isTeamLead" },
        { data: "jobResponsabilities" },
        { data: "jobRole" },
        { data: "inCountryLayer1" },
        { data: "inCountryLayer2" },
        { data: "inCountryLayer3" },
        { data: "inCountryLayer4" },
        { data: "inCountryLayer5" },
        { data: "inCountryLayer6" },
        { data: "inCountryLayer7" },
        { data: "inCountryLayer8" },
        { data: "inCountryLayer9" },
        { data: "inCountryLayer10" },
        { data: "inCountryLayer11" },
        { data: "inCountryLayer12" },
        { data: "inCountryLayer13" },
        { data: "inCountryLayer14" },
        { data: "globalLayer1" },
        { data: "globalLayer2" },
        { data: "globalLayer3" },
        { data: "globalLayer4" },
        { data: "globalLayer5" },
        { data: "globalLayer6" },
        { data: "globalLayer7" },
        { data: "globalLayer8" },
        { data: "globalLayer9" },
        { data: "globalLayer10" },
        { data: "leavingReason" },
        { data: "statusDetails" },
        { data: "localManager" },
        { data: "localManagerCnum" },
        { data: "localManagerMail" },
        { data: "localManagerNotesId" },
        { data: "mail" },
        { data: "mission" },
        { data: "name" },
        { data: "notInOrgType" },
        { data: "office" },
        { data: "physicalLocationImt" },
        { data: "physicalLocationIot" },
        { data: "primaryJobCategory" },
        { data: "reportingManagerCnum" },
        { data: "reportingManagerEmail" },
        { data: "reportingManagerNotesId" },
        // { data: "rmBillingType" }, // replaced by 4 columns below
        { data: "mscBillingType" },
        { data: "mscBillingCategory" },
        { data: "mscResourceCategory" },
        { data: "mscCoverage" },
        { data: "specialization" },
        { data: "state" },
        { data: "status" },
        { data: "updateStatus" },
        { data: "updatedBy" },
        { data: "updatedDate" },
        { data: "userId" },
        { data: "workLocation" },
        { data: "workLocationCode" },
        { data: "workPlaceIndicator" },
        { data: "htrtREF" },
        { data: "htrtHA" },
        { data: "htrtGOM" },
        { data: "forecastCYQ1" },
        { data: "forecastCYQ2" },
        { data: "forecastCYQ3" },
        { data: "forecastCYQ4" },
        { data: "forecastNYQ1" },
        { data: "forecastNYQ2" },
      ],
      ajax: {
        type: "GET",
        url: "admin/trace/user/" + cnum,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr, settings) {
          xhr.setRequestHeader(
            "Authorization",
            "Bearer " + Cookies.get("token")
          );
        },
        dataSrc: function (data) {
          for (var i = 0; i < data.traces.length; i++) {
            data.traces[i].yearMonth =
              data.traces[i].year +
              "/" +
              searchResourceContainer.getMonthName(data.traces[i].month);
            $.each(data.traces[i], function (key, val) {
              switch (val) {
                case "0":
                  data.traces[i][key] = "No";
                  break;
                case "1":
                  data.traces[i][key] = "Yes";
                  break;
              }
            });
          }
          $("#pleaseWait").hide();
          return data.traces;
        },
      },
    };
    IBMCore.common.widget.datatable.init(
      "#searchResourceResult1",
      optionalSettingsObject
    );
    cf.datatabelSearchLength("#searchResourceResult1");
    IBMCore.common.widget.selectlist.init(
      "#searchResourceResult1_length select"
    );
  },

  initTable2: function (cnum) {
    var optionalSettingsObject = {
      responsive: true,
      deferRender: "true",
      order: [[0, "desc"]],
      columnDefs: [
        {
          targets: 0,
          visible: false,
        },
        {
          orderData: [0],
          targets: [1],
        },
      ],
      columns: [
        { data: "timestamp" },
        { data: "date" },
        { data: "operation" },
        { data: "columnName" },
        { data: "columnValue" },
        { data: "updatedBy" },
      ],
      ajax: {
        type: "GET",
        url: "admin/trace/auditchanges/" + cnum,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr, settings) {
          xhr.setRequestHeader(
            "Authorization",
            "Bearer " + Cookies.get("token")
          );
        },
        dataSrc: function (data) {
          for (var i = 0; i < data.changes.length; i++) {
            var timezoneToDate = new Date(data.changes[i].timestamp);
            var date =
              timezoneToDate.getFullYear() +
              "-" +
              searchResourceContainer.getMonthName(
                timezoneToDate.getMonth() + 1
              ) +
              "-" +
              timezoneToDate.getDate();
            var time =
              ("0" + timezoneToDate.getHours()).substr(-2) +
              ":" +
              ("0" + timezoneToDate.getMinutes()).substr(-2) +
              ":" +
              ("0" + timezoneToDate.getSeconds()).substr(-2);
            data.changes[i].date = date + " | " + time;
          }
          return data.changes;
        },
      },
    };
    IBMCore.common.widget.datatable.init(
      "#searchResourceResult2",
      optionalSettingsObject
    );
    cf.datatabelSearchLength("#searchResourceResult2");
    IBMCore.common.widget.selectlist.init(
      "#searchResourceResult2_length select"
    );
  },

  getMonthName: function (i) {
    var month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return month[parseInt(i) - 1];
  },
};

var backups = {
  start: function () {
    $("#pleaseWait").show();
    backups.generateBackups();
    $("#backups").on("click", "li a", function () {
      let thisPath = $(this).attr("data-path");
      cf.showOverlay(
        "Restore Backup",
        "Are you sure you want to restore this backup?"
      );
      $("#alertOverlay .ibm-btn-pri").addClass("overlayRestoreBackup");
      $("#alertOverlay .ibm-btn-pri").attr("data-path", thisPath);
    });

    $("#backups").on("click", "#createBackup", function () {
      let thisPath = $(this).children().attr("data-path");
      cf.showOverlay(
        "Create Backup",
        "Are you sure you want to create this backup?"
      );
      $("#alertOverlay .ibm-btn-pri").addClass("overlayCreateBackup");
    });

    $("#alertOverlay").on("click", ".overlayRestoreBackup", async function () {
      let pathAux = $("#alertOverlay .ibm-btn-pri").attr("data-path");
      $("#alertOverlay .ibm-btn-sec").trigger("click");
      $("#pleaseWait").show();
      await backend
        .getInfo("superadmin/backup/restore?path=" + pathAux, "GET")
        .then(function (value) {
          $("#pleaseWait").hide();
          cf.showOverlay("Restore Backup", value.message);
          $("#alertOverlay .ibm-btn-pri").hide();
        });
    });

    $("#alertOverlay").on("click", ".overlayCreateBackup", async function () {
      $("#alertOverlay .ibm-btn-sec").trigger("click");
      $("#pleaseWait").show();
      var info = { forced: true };
      await backend
        .getInfo("superadmin/backup/create?forced=true", "GET")
        .then(function (value) {
          backups.generateBackups();
          $("#pleaseWait").hide();
          cf.showOverlay("Create Backup", value.message);
          $("#alertOverlay .ibm-btn-pri").hide();
        });
    });
  },
  generateBackups: async function () {
    backups.info = await backend.getInfo("superadmin/backup/list", "GET");
    backups.info = backups.info.files;
    let liAux = "";
    for (let i = 0; i < backups.info.length; i++) {
      let formatDate = backups.info[i].time.split(" ");
      formatDate =
        formatDate[2] +
        " " +
        formatDate[1] +
        " " +
        formatDate[5] +
        " - " +
        formatDate[3];
      liAux =
        liAux +
        "<li><a href = '#admin' data-path='" +
        backups.info[i].path +
        "'>" +
        formatDate +
        "</a></li>";
    }
    $("#backups ul").html(liAux);
    $("#pleaseWait").hide();
  },
};

// custom taxonomy object
var taxonomy_custom = {
  taxonomyData: {},
  taxonomyType: "",
  taxonomyFields: {},
  idsChecked: [],
  start: async function (data) {
    $("#pleaseWait").show();

    taxonomyData = data;
    taxonomyType = data.type;

    // --- create objects for fields that will be displayed in the table
    taxonomyFields = {};
    data.fields.forEach((field) => {
      taxonomyFields[field] = {};
    });
    // ---

    $(".taxonomyTableSelect").select();

    var optionalSettingsObject = {
      autoWidth: false,
      deferRender: "true",
      order: [[2, "asc"]],
      columnDefs: [
        {
          targets: [0, 1],
          orderable: false,
        },
      ],
      columns: [
        { data: "checkAll" },
        { data: "nbUsers" },
        ...Object.keys(taxonomyFields).map((val, i) => {
          return { data: `name${i + 1}` };
        }),
        { data: "isCurent" },
        { data: "lastUpdatedDate" },
        { data: "lastUpdatedBy" },
      ],
      createdRow: function (row, data, dataIndex) {
        let date = $(row).find(
          "td:nth-child(" + (4 + [...Object.keys(taxonomyFields)].length) + ")"
        );
        let date_val = date.text().split("  ");
        if (date_val[0] !== "-") date.html(date_val[0] + "<br>" + date_val[1]);

        let ids = data.id1 + "_" + data.id2 + "_" + data.id3;
        $(row).attr("data-ids", ids);
      },
      ajax: {
        url: "admin/taxonomies/mappings/table/" + taxonomyData.path,
        beforeSend: function (xhr, settings) {
          xhr.setRequestHeader(
            "Authorization",
            "Bearer " + Cookies.get("token")
          );
        },
        dataSrc: function (data) {
          for (var i = 0; i < data.resources.length; i++) {
            let j = 1;
            for (const key in taxonomyFields) {
              taxonomyFields[key][data.resources[i][`id${j}`]] =
                data.resources[i][`name${j}`];

              j++;
            }

            data.resources[i].nbUsers =
              "<span class='howManyTaxonomy'>How Many?</span>";
            data.resources[i].checkAll =
              '<p class="ibm-input-group"><input class="ibm-styled-checkbox"' +
              'id="' +
              i +
              "_" +
              data.resources[i].id1 +
              '" name="taxonomy' +
              taxonomyType +
              'Check" type="checkbox" value="no" />' +
              '<label for="' +
              i +
              "_" +
              data.resources[i].id1 +
              '"></label> </p>';
          }
          $("#pleaseWait").hide();
          return data.resources;
        },
      },
      initComplete: function () {
        this.api()
          .columns()
          .every(function () {
            var column = this;

            if (column.index() > 1) {
              var idSelect = column.index() - 1;
              var select = $(
                ".taxonomy" + taxonomyType + "TableContainer #select" + idSelect
              ).on("change", function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());

                column.search(val ? "^" + val : "", true, false).draw();
              });
              select.find("option").not(":first").remove();

              if (idSelect === 5) {
                column
                  .data()
                  .map((col) => col.split("  ")[0])
                  .unique()
                  .sort()
                  .each(function (d, j) {
                    select.append(
                      '<option value="' + d + '">' + d + "</option>"
                    );
                  });
              } else {
                column
                  .data()
                  .unique()
                  .sort()
                  .each(function (d, j) {
                    select.append(
                      '<option value="' + d + '">' + d + "</option>"
                    );
                  });
              }
            }
          });
        $("#pleaseWait").hide();
      },
    };

    IBMCore.common.widget.datatable.init(
      `#taxonomy${taxonomyType}Table`,
      optionalSettingsObject
    );

    cf.datatabelSearchLength(`#taxonomy${taxonomyType}Table`);
    IBMCore.common.widget.selectlist.init(
      `.taxonomy${taxonomyType}TableContainer select`
    );
    taxonomy_custom.allEvents();
  },

  // deactivate sunset/sunset and move/sunrise buttons
  deactivateButtons: function () {
    let checked = $(`#taxonomy${taxonomyType}Check`).is(":checked");
    if (checked) {
      $(`#taxonomy${taxonomyType}Check`)
        .prop("checked", false)
        .trigger("change");
    }

    $(
      `#taxonomy${taxonomyType}Buttons button:gt(0):not('#export_to_excel_taxonomy_${taxonomyType.toLowerCase()}')`
    ).attr("disabled", "disabled");
  },

  //get all info from a specific row of tabel;  elem is the checkbox
  getIdsFromRow: function (elem) {
    let table = $(`#taxonomy${taxonomyType}Table`).DataTable();
    let row = $(elem).parents("tr");
    let idSend = {
      id1: table.row(row).data().id1,
      id2: table.row(row).data().id2,
      id3: table.row(row).data().id3,
      name1: table.row(row).data().name1,
      name2: table.row(row).data().name2,
      name3: table.row(row).data().name3,
    };

    return idSend;
  },

  // create toxonomy.idsChecked: an array with information from all selected rows
  getIdsChecked: function () {
    taxonomy_custom.idsChecked = [];
    $(
      `#taxonomy${taxonomyType}Table input[type=checkbox]:checked:not(#taxonomy${taxonomyType}Check)`
    ).each(function () {
      taxonomy_custom.idsChecked.push(taxonomy_custom.getIdsFromRow(this));
    });
  },

  allEvents: function () {
    $(`#export_to_excel_taxonomy_${taxonomyType.toLowerCase()}`).click(
      function () {
        var url = "export/excel/taxonomyMappings/" + taxonomyData.path;
        $("#pleaseWait").show();
        cf.exportToExcelCall(
          url,
          "",
          "",
          "Taxonomy_" +
            Object.keys(taxonomyFields)
              .map((field) => field.replace("taxonomy", ""))
              .join("_") +
            "_"
        );
      }
    );

    $(`#taxonomy${taxonomyType}Check`).click(function () {
      let checked = $(`#taxonomy${taxonomyType}Check`).is(":checked");
      $(`#taxonomy${taxonomyType}Table input:checkbox`)
        .prop("checked", checked)
        .trigger("change");
      checked
        ? $(
            `#taxonomy${taxonomyType}Buttons button:gt(0):not('#export_to_excel_taxonomy_${taxonomyType.toLowerCase()}')`
          ).removeAttr("disabled")
        : $(
            `#taxonomy${taxonomyType}Buttons button:gt(0):not('#export_to_excel_taxonomy_${taxonomyType.toLowerCase()}')`
          ).attr("disabled", "disabled");
    });

    $(`#taxonomy${taxonomyType}Table`).on(
      "change",
      "input[type=checkbox]",
      function () {
        $(`#taxonomy${taxonomyType}Table input[type=checkbox]:checked`).length >
        0
          ? $(
              `#taxonomy${taxonomyType}Buttons button:gt(0):not('#export_to_excel_taxonomy_${taxonomyType.toLowerCase()}')`
            ).removeAttr("disabled")
          : $(
              `#taxonomy${taxonomyType}Buttons button:gt(0):not('#export_to_excel_taxonomy_${taxonomyType.toLowerCase()}')`
            ).attr("disabled", "disabled");
      }
    );

    $(`.taxonomy${taxonomyType}TableContainer`).on(
      "click",
      ".howManyTaxonomy",
      async function () {
        $("#pleaseWait").show();
        let row = $(this).parents("tr").index();
        let number = await backend.processInfo(
          "admin/taxonomies/mappings/users/" + taxonomyData.path,
          "POST",
          taxonomy_custom.getIdsFromRow(this)
        );
        $(
          `.taxonomy${taxonomyType}TableContainer .howManyTaxonomy:eq(${row})`
        ).html(number.message);
        $(
          `.taxonomy${taxonomyType}TableContainer .howManyTaxonomy:eq(${row})`
        ).addClass("howManyResolvedTaxonomy");
        $("#pleaseWait").hide();
      }
    );

    $(`#taxonomy${taxonomyType}Buttons`).on(
      "click",
      ".ibm-btn-pri.ibm-btn-blue-50:eq(0)",
      async function () {
        $("#alertOverlay")
          .removeClass(function (index, css) {
            return (css.match(/(^|\s)alert_overlay_\S+/g) || []).join(" ");
          })
          .addClass(`alert_overlay_${taxonomyType.toLowerCase()}`);

        cf.showOverlay("Add new mapping", "");
        await backend.insertData(
          ".overlayContent",
          `view/taxonomyOverlayAddNewMapping${taxonomyType}.html`
        );

        taxonomyData.fields.forEach((val) => {
          taxonomy_custom.populateDataSelectOverlay(val, `#${val}`);
        });

        $("#alertOverlay .ibm-btn-pri").hide();
        $("#alertOverlay .ibm-btn-pri")
          .removeClass(function (index, css) {
            return (css.match(/(^|\s)addTaxonomy\S+/g) || []).join(" ");
          })
          .addClass(`addTaxonomy${taxonomyType}`);
      }
    );

    $(`#taxonomy${taxonomyType}Buttons`).on(
      "click",
      ".ibm-btn-pri.ibm-btn-blue-50:eq(1)",
      async function () {
        cf.showOverlay(
          "Sunset",
          "Are you sure you want to Sunset these mappings?"
        );
        taxonomy_custom.getIdsChecked();
        $("#alertOverlay .ibm-btn-pri")
          .removeClass(function (index, css) {
            return (css.match(/(^|\s)sunsetTaxonomy\S+/g) || []).join(" ");
          })
          .addClass(`sunsetTaxonomy${taxonomyType}`);
      }
    );

    $(`#taxonomy${taxonomyType}Buttons`).on(
      "click",
      ".ibm-btn-pri.ibm-btn-blue-50:eq(2)",
      async function () {
        cf.showOverlay("Sunset and move", "");
        await backend.insertData(
          ".overlayContent",
          `view/taxonomyOverlaySunsetAndMove${taxonomyType}.html`
        );
        $("#alertOverlay .ibm-btn-pri").hide();
        IBMCore.common.widget.selectlist.init(".overlayContent select");

        $(`.taxonomySunsetAndMove${taxonomyType}:eq(0)`)
          .siblings("span")
          .find(".select2-selection__rendered")
          .addClass("spinner");
        let infoDis = await backend.getInfo(
          "admin/taxonomies/mappings/getAllActiveTaxonomies/" +
            taxonomyData.path,
          "GET"
        );
        details.putSelectsData(
          `.taxonomySunsetAndMove${taxonomyType}:eq(0)`,
          infoDis
        );

        taxonomy_custom.getIdsChecked();
        $("#alertOverlay .ibm-btn-pri")
          .removeClass(function (index, css) {
            return (css.match(/(^|\s)sunsetAndMoveTaxonomy\S+/g) || []).join(
              " "
            );
          })
          .addClass(`sunsetAndMoveTaxonomy${taxonomyType}`);
      }
    );

    $(`#taxonomy${taxonomyType}Buttons`).on(
      "click",
      ".ibm-btn-pri.ibm-btn-blue-50:eq(3)",
      async function () {
        cf.showOverlay(
          "Sunrise",
          "Are you sure you want to Sunrise these mappings?"
        );
        taxonomy_custom.getIdsChecked();
        $("#alertOverlay .ibm-btn-pri")
          .removeClass(function (index, css) {
            return (css.match(/(^|\s)sunriseTaxonomy\S+/g) || []).join(" ");
          })
          .addClass(`sunriseTaxonomy${taxonomyType}`);
      }
    );

    $("#alertOverlay").on(
      "keyup input change",
      ".taxonomyAddNewMapping",
      function (e) {
        if (
          $(this)
            .closest("#alertOverlay")
            .hasClass(`alert_overlay_${taxonomyType.toLowerCase()}`)
        ) {
          let selectListP = $(
            ".taxonomyIfExist:eq(" +
              $(".taxonomyAddNewMapping").index(this) +
              ")"
          );
          let list = $(this).attr("list");
          let value = $(this).val();

          selectListP.removeClass(
            "ibm-textcolor-green-30 ibm-textcolor-blue-30"
          );
          if ($("#" + list + ' option[value="' + value + '"]').length > 0) {
            selectListP.html("Existing");
            selectListP.addClass("ibm-textcolor-green-30");
          } else {
            selectListP.html("New");
            selectListP.addClass("ibm-textcolor-blue-30");
          }

          if (value != "") {
            selectListP.css("visibility", "visible");
            selectListP.removeClass("IBMhidden");
            let key = Object.keys(taxonomyFields[list]).find(
              (key) => taxonomyFields[list][key] === value
            );
            key === undefined && (key = null);
            $(this).attr("data-id", key);
          } else {
            selectListP.css("visibility", "hidden");
            selectListP.addClass("IBMhidden");
          }

          $(".IBMhidden").length > 0
            ? $("#alertOverlay .ibm-btn-pri").hide()
            : $("#alertOverlay .ibm-btn-pri").show();
        }
      }
    );

    // sunset and move - dropdown 1
    $("#alertOverlay").on(
      "click",
      `.addTaxonomy${taxonomyType}`,
      async function () {
        $("#pleaseWait").show();
        let info = {
          id1:
            $(".taxonomyAddNewMapping:eq(0)").attr("data-id") != undefined
              ? $(".taxonomyAddNewMapping:eq(0)").attr("data-id")
              : null,
          name1: $(".taxonomyAddNewMapping:eq(0)").val(),
          id2:
            $(".taxonomyAddNewMapping:eq(1)").attr("data-id") != undefined
              ? $(".taxonomyAddNewMapping:eq(1)").attr("data-id")
              : null,
          name2: $(".taxonomyAddNewMapping:eq(1)").val(),
          id3:
            $(".taxonomyAddNewMapping:eq(2)").attr("data-id") != undefined
              ? $(".taxonomyAddNewMapping:eq(2)").attr("data-id")
              : null,
          name3: $(".taxonomyAddNewMapping:eq(2)").val(),
          lastUpdatedBy: Cookies.get("loginName"),
        };
        await backend
          .processInfo(
            "admin/taxonomies/mappings/add/" + taxonomyData.path,
            "POST",
            info
          )
          .then(function (value) {
            $("#pleaseWait").hide();
            cf.showOverlay("Add new mapping", value.message);
            $("#alertOverlay .ibm-btn-pri").hide();
            $(`#taxonomy${taxonomyType}Table`)
              .DataTable()
              .ajax.reload(function () {
                // deactivate sunset/sunset and move/sunrise buttons
                taxonomy_custom.deactivateButtons();
              });
          });
      }
    );

    // remember nr of dropdowns for the taxonomy
    let nr_fields = 1;

    // sunset and move - dropdown 2
    if (taxonomyData.urls && taxonomyData.urls[0]) {
      nr_fields++;

      $("#alertOverlay").on(
        "change",
        `.taxonomySunsetAndMove${taxonomyType}:eq(0)`,
        async function () {
          var optionSelected = $(this).find("option:selected");
          var valueSelected = optionSelected.val();

          $(`.taxonomySunsetAndMove${taxonomyType}:eq(1)`)
            .find("option")
            .remove()
            .end()
            .append('<option value="" selected>Select an option</option>')
            .trigger("change");

          if (valueSelected != "") {
            $(`.taxonomySunsetAndMove${taxonomyType}:eq(1)`)
              .siblings("span")
              .find(".select2-selection__rendered")
              .addClass("spinner");
            var aux = await backend.getInfo(
              taxonomyData.urls[0].path +
                "?" +
                taxonomyData.urls[0].params[0] +
                "=" +
                valueSelected,
              "GET"
            );
            details.putSelectsData(
              `.taxonomySunsetAndMove${taxonomyType}:eq(1)`,
              aux.options
            );
            !$(`.taxonomySunsetAndMove${taxonomyType}:eq(0)`).attr(
              "disabled"
            ) &&
              $(`.taxonomySunsetAndMove${taxonomyType}:eq(1)`).removeAttr(
                "disabled"
              );

            // if 2nd dropdown ony has one option => auto-select and trigger change to enable "OK" button
            if (aux.options.length === 1)
              $(`.taxonomySunsetAndMove${taxonomyType}:eq(1)`).trigger(
                "change"
              );
          } else {
            $(`.taxonomySunsetAndMove${taxonomyType}:eq(1)`).attr(
              "disabled",
              "disabled"
            );
          }
        }
      );
    }

    // sunset and move - dropdown 3
    if (taxonomyData.urls && taxonomyData.urls[0] && taxonomyData.urls[1]) {
      nr_fields++;

      $("#alertOverlay").on(
        "change",
        `.taxonomySunsetAndMove${taxonomyType}:eq(1)`,
        async function () {
          var optionSelected = $(this).find("option:selected");
          var valueSelected = optionSelected.val();
          var fundingBuId = $(`.taxonomySunsetAndMove${taxonomyType}:eq(0)`)
            .find("option:selected")
            .val();

          $(`.taxonomySunsetAndMove${taxonomyType}:eq(2)`)
            .find("option")
            .remove()
            .end()
            .append('<option value="" selected>Select an option</option>')
            .trigger("change");

          if (valueSelected != "") {
            $(`.taxonomySunsetAndMove${taxonomyType}:eq(2)`)
              .siblings("span")
              .find(".select2-selection__rendered")
              .addClass("spinner");
            var aux = await backend.getInfo(
              taxonomyData.urls[1].path +
                "?" +
                taxonomyData.urls[1].params[0] +
                "=" +
                fundingBuId +
                "&" +
                taxonomyData.urls[1].params[1] +
                "=" +
                +valueSelected,
              "GET"
            );
            details.putSelectsData(
              `.taxonomySunsetAndMove${taxonomyType}:eq(2)`,
              aux.options
            );
            !$(`.taxonomySunsetAndMove${taxonomyType}:eq(1)`).attr(
              "disabled"
            ) &&
              $(`.taxonomySunsetAndMove${taxonomyType}:eq(2)`).removeAttr(
                "disabled"
              );

            //  if 3rd dropdown ony has one option => auto-select and trigger change to enable "OK" button
            if (aux.options.length === 1)
              $(`.taxonomySunsetAndMove${taxonomyType}:eq(2)`).trigger(
                "change"
              );
          } else {
            $(`.taxonomySunsetAndMove${taxonomyType}:eq(2)`).attr(
              "disabled",
              "disabled"
            );
          }
        }
      );
    }

    $("#alertOverlay").on(
      "change",
      `.taxonomySunsetAndMove${taxonomyType}:eq(${nr_fields - 1})`,
      function () {
        var optionSelected = $(this).find("option:selected");
        var valueSelected = optionSelected.val();
        if (valueSelected != "") {
          $("#alertOverlay .ibm-btn-pri").show();
        } else {
          $("#alertOverlay .ibm-btn-pri").hide();
        }
      }
    );

    $("#alertOverlay").on(
      "click",
      `.sunsetAndMoveTaxonomy${taxonomyType}`,
      async function () {
        $("#pleaseWait").show();
        let inf = {
          sunsetAndMoveRequest: {
            oldMapping: {},
            newMapping: {},
          },
        };
        inf.sunsetAndMoveRequest.oldMapping = taxonomy_custom.idsChecked;
        inf.sunsetAndMoveRequest.newMapping = {
          id1: $(`.taxonomySunsetAndMove${taxonomyType}:eq(0)`).val(),
          id2: $(`.taxonomySunsetAndMove${taxonomyType}:eq(1)`).val(),
          id3: $(`.taxonomySunsetAndMove${taxonomyType}:eq(2)`).val(),
        };

        await backend
          .processInfo(
            "admin/taxonomies/mappings/sunsetAndSunriseRequest/" +
              taxonomyData.path,
            "POST",
            inf
          )
          .then(function (value) {
            $("#pleaseWait").hide();
            cf.showOverlay("Sunset and move", value.message);
            $("#alertOverlay .ibm-btn-pri").hide();
            $(`#taxonomy${taxonomyType}Table`)
              .DataTable()
              .ajax.reload(function () {
                // deactivate sunset/sunset and move/sunrise buttons
                taxonomy_custom.deactivateButtons();
              });
          });
      }
    );

    $("#alertOverlay").on(
      "click",
      `.sunriseTaxonomy${taxonomyType}, .sunsetTaxonomy${taxonomyType}`,
      async function () {
        $("#pleaseWait").show();
        let inf = {};
        if ($(this).hasClass(`sunriseTaxonomy${taxonomyType}`))
          inf.sunriseRequest = taxonomy_custom.idsChecked;
        else inf.sunsetRequest = taxonomy_custom.idsChecked;
        await backend
          .processInfo(
            "admin/taxonomies/mappings/sunsetAndSunriseRequest/" +
              taxonomyData.path,
            "POST",
            inf
          )
          .then(function (value) {
            $("#pleaseWait").hide();
            cf.showOverlay("Sunrise", value.message);
            $("#alertOverlay .ibm-btn-pri").hide();
            $(`#taxonomy${taxonomyType}Table`)
              .DataTable()
              .ajax.reload(function () {
                // deactivate sunset/sunset and move/sunrise buttons
                taxonomy_custom.deactivateButtons();
              });
          });
      }
    );

    // actions on tab switching
    if (taxonomyType == "Discipline") {
      $(".taxonomy_tabs li a").click(function () {
        let selected = $(this).attr("data-container");
        taxonomy_custom.taxonomyTabActions(selected);
      });
    }
  },

  populateDataSelectOverlay: function (nameObj, idSelect) {
    Object.entries(taxonomyFields[nameObj]).forEach(([key, val]) =>
      $(idSelect).append('<option value="' + val + '">')
    );
  },

  // taxonomy tab actions
  taxonomyTabActions: function (idToShow) {
    $(".taxonomy_tabs li a").attr("aria-selected", false);
    $("#" + idToShow + "Tab").attr("aria-selected", true);
    $(".taxonomy_container").hide();
    $("#" + idToShow).show();

    var taxonomyTable = "#" + idToShow + "Table";

    let selected_taxonomy =
      idToShow === "taxonomyDiscipline" ? "taxonomy" : idToShow;

    if ($.fn.DataTable.isDataTable($(taxonomyTable))) {
      $(taxonomyTable).DataTable().ajax.reload();

      taxonomyType = idToShow.replace("taxonomy", "");
      taxonomyData = window[selected_taxonomy].taxonomyData;
      taxonomyFields = window[selected_taxonomy].taxonomyFields;

      // deactivate sunset/sunset and move/sunrise buttons
      taxonomy_custom.deactivateButtons();
    } else {
      window[selected_taxonomy].start();
    }
  },
};

////////////////////////////////
// ----- all taxonomies ----- //

// custom taxonomy function - used for creating a taxonomy
const buildTaxonomy = (taxonomyObj) => {
  let taxonomyFields = {};

  taxonomyObj.fields.forEach((field) => {
    taxonomyFields[field] = {};
  });

  return {
    taxonomyData: {},
    taxonomyFields: taxonomyFields,
    start: () => {
      window["taxonomy" + taxonomyObj.type].taxonomyData = taxonomyObj;
      taxonomy_custom.start(window["taxonomy" + taxonomyObj.type].taxonomyData);
    },
  };
};

// taxonomy discipline tab
var taxonomyDiscipline = buildTaxonomy({
  type: "Discipline",
  fields: ["taxonomyDiscipline", "taxonomyJB", "taxonomySpec"],
  path: "discipline",
  urls: [
    {
      path: "general/fields/jobRoles",
      params: ["disciplineId"],
    },
    {
      path: "general/fields/jobRoles/specializations",
      params: ["disciplineId", "jobRoleId"],
    },
  ],
});
var taxonomy = taxonomyDiscipline; // workaround to fix difference in naming for the first taxonomy tab

// taxonomy funding tab
var taxonomyFunding = buildTaxonomy({
  type: "Funding",
  fields: [
    "taxonomyFundingBU",
    "taxonomyBeneficiaryLevel",
    "taxonomyBeneficiarySubLevel",
  ],
  path: "funding_bu",
  urls: [
    {
      path: "general/fields/beneficiary/levels",
      params: ["fundingBuId"],
    },
    {
      path: "general/fields/beneficiary/subLevels",
      params: ["fundingBuId", "beneficiaryLevelId"],
    },
  ],
});

// taxonomy primary job category tab
var taxonomyPrimary = buildTaxonomy({
  type: "Primary",
  fields: ["taxonomyPrimaryJC"],
  path: "primary_job_category",
});

// taxonomy msc billing type tab
var taxonomyBilling = buildTaxonomy({
  type: "Billing",
  fields: ["taxonomyBillingType"],
  path: "msc_billing_type",
});

// taxonomy msc billing category tab
var taxonomyBillingCategory = buildTaxonomy({
  type: "BillingCategory",
  fields: ["taxonomyBillingCategoryName"],
  path: "msc_billing_category",
});

// taxonomy msc coverage tab
var taxonomyCoverage = buildTaxonomy({
  type: "Coverage",
  fields: ["taxonomyCoverageName"],
  path: "msc_coverage",
});

// taxonomy msc resource category tab
var taxonomyResourceCategory = buildTaxonomy({
  type: "ResourceCategory",
  fields: ["taxonomyResourceCategoryName"],
  path: "msc_resource_category",
});

//////////////////////////////
// taxonomy funding source tab
var taxonomyFundingSource = buildTaxonomy({
  type: "FundingSource",
  fields: ["taxonomyFundingSourceName"],
  path: "funding_source",
});

// taxonomy budget deployment tab
var taxonomyBudgetDeployment = buildTaxonomy({
  type: "BudgetDeployment",
  fields: ["taxonomyBudgetDeploymentName"],
  path: "budget_deployment",
});

// taxonomy Mission - Beneficiary tab
var taxonomyMissionBeneficiary = buildTaxonomy({
  type: "MissionBeneficiary",
  fields: ["taxonomyMission", "taxonomyBeneficiary"],
  path: "mission",
  urls: [
    {
      path: "general/fields/beneficiary/mission", // ??
      params: ["missionId"], // ??
    },
  ],
});

// taxonomy Status - Status Details tab
var taxonomyStatusStatusDetails = buildTaxonomy({
  type: "StatusLeavingReason",
  fields: ["taxonomyStatus", "taxonomyStatusDetails"],
  path: "statusstatusdetails",
  urls: [
    {
      path: "general/fields/status_details/status", // ??
      params: ["statusId"], // ??
    },
  ],
});

// taxonomy Status
var taxonomyStatus = buildTaxonomy({
  type: "Status",
  fields: ["taxonomyStatus"],
  path: "status",
});

// taxonomy status details
var taxonomyStatusDetails = buildTaxonomy({
  type: "StatusDetails",
  fields: ["taxonomyStatusDetails"],
  path: "status_details",
});

// taxonomy leaving reason
var taxonomyLeavingReason = buildTaxonomy({
  type: "LeavingReason",
  fields: ["taxonomyLeavingReason"],
  path: "leaving_reason",
});

// taxonomy conversation or employee sub type tab
var taxonomyConversation = buildTaxonomy({
  type: "Conversation",
  fields: ["taxonomyConversation"],
  path: "conversation",
});

// taxonomy budget_type
var taxonomyBudgetType = buildTaxonomy({
  type: "BudgetType",
  fields: ["taxonomyBudgetType"],
  path: "budget_type",
});
