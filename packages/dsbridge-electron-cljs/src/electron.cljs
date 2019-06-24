(ns electron
  (:require [builtin-apis :as a]
            [utils :as u]
            [atoms :refer [ipc-main apis]]))

(defn register-api
  [api]
  (let [{:keys [sync-handler async-handler namespace]} api]
    (swap! apis assoc namespace api)
    (.on ^js @ipc-main namespace
         (fn [evt js-arg]
           (when sync-handler (sync-handler evt js-arg))
           (when async-handler (async-handler evt js-arg))))))

(defn init
  "Init Electron to be DS ready"
  [ipcMain]
  (reset! ipc-main ipcMain)
  (doseq [api [a/ds-init
               a/has-native-method
               a/disable-javascript-dialog-block]]
    (register-api api))
  (prn "DSBridge for Electron initialized."))

(defn hasJavascriptMethod
  "Test whether the handler exist in Web"
  [method-name]
  true)

(defn addJavascriptObject
  "Add the API object with supplied namespace into Web"
  [api-object namespace])

(defn removeJavascriptObject
  "Remove the API object with supplied namespace."
  [])

(defn callHandler
  "Call handlers registered in Web"
  [])

(defn disableJavascriptDialogBlock
  "Not implemented"
  [])

(defn setJavascriptCloseWindowListener
  "Not implemented"
  [])

(defn setWebContentsDebuggingEnabled
  "Not implemented"
  [])
