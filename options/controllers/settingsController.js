'use strict';

function SettingsController($scope, settings) {
    $scope.settings = {};
    var settingsDict = ['PasswordListIconOption', 'PasswordListGroupOption', 'PrimaryRememberTime', 'SecondaryRememberTime'];
    activate();

    function activate() {
        _loadSettings();
    }

    function _loadSettings() {
        settingsDict.forEach(function(setting) {
            var getSettingFunc = _getter(setting);
            settings[getSettingFunc]().then(function(option) {
                $scope.settings[setting] = option;
            });
        });
    }

    function _getter(setting) {
        return 'get' + setting;
    }

    function _setter(setting) {
        return 'set' + setting;
    }

    $scope.saveSettings = function() {
  	    Object.keys($scope.settings).forEach(function(setting) {
            if (typeof settings['set' + setting] === 'function') {
                settings[_setter(setting)]($scope.settings[setting]);
            }
        });
    }
}
