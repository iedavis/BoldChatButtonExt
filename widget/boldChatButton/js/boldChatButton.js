/**
 * @fileoverview BoldChat Button Invite
 * Option.
 * @author ian.davis@oracle.com
 */

define(
  //-------------------------------------------------------------------
  // PACKAGE NAME
  //-------------------------------------------------------------------
  'boldChatButton',

  //-------------------------------------------------------------------
  // DEPENDENCIES
  //-------------------------------------------------------------------
  ['knockout','ccLogger'],

  //-------------------------------------------------------------------
  // MODULE DEFINITION
  //-------------------------------------------------------------------
  function(ko, ccLogger) {

    "use strict";

    var self;

    return {

      onLoad: function(widgetModel) {
        self = widgetModel;
        self.bcScript = document.location.protocol + '//vmss.boldchat.com/aid/' + self.bcAccountID() + '/bc.vms4/vms.js';
        if(self.bcAccountID() === "") ccLogger.info("BoldChat Widget needs Account ID configured.");
        if(self.bcWebsiteID() === "") ccLogger.info("BoldChat Widget needs Website ID configured.");
      },

      beforeAppear: function(page) {

        if(self.bcAccountID() !== "" && self.bcWebsiteID() !== "") {
          window._bcvma = [];
          _bcvma.push(["setAccountID", self.bcAccountID()]);
          _bcvma.push(["setParameter", "WebsiteID", self.bcWebsiteID()]);
          _bcvma.push(["setParameter", "VisitRef", self.user().id()]);
          _bcvma.push(["setParameter", "VisitName", self.user().firstName() + " " + self.user().lastName()]);
          _bcvma.push(["setParameter", "VisitEmail", self.user().emailAddress()]);
          _bcvma.push(["addStatic", {type: "chat", bdid: self.bcButtonID(), id: 'boldchat-' + self.id()}]);

          if(window._bcvmb) require.undef(self.bcScript);
          require([self.bcScript]);
        }
      }
    };
  }
);