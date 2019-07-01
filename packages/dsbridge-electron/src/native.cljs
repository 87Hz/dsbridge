(ns native
  (:require [builtin-apis :as a]
            [util :as u]
            [atoms :refer [ipc-main apis]]))

(defn register-api
  [api]
  (let [{:keys [sync-handler async-handler namespace]} api]
    (swap! apis assoc namespace api)
    (.on ^js @ipc-main namespace
         (fn [evt arg-json]
           (when sync-handler (sync-handler evt arg-json))
           (when async-handler (async-handler evt arg-json))))))

(defn init
  "Init Electron to be DS ready"
  [ipcMain]
  (reset! ipc-main ipcMain)
  (doseq [api [a/ds-init
               a/has-native-method
               a/disable-javascript-dialog-block]]
    (register-api api))
  (prn "DSBridge for Electron initialized."))


;; -------------------------------------------------

(defn addJavascriptObject
  "Add the API object with supplied namespace into Web"
  [js-api-obj namespace]
  (let [api-obj (js->clj js-api-obj)
        sync-handler (get api-obj "sync")
        async-handler (get api-obj "async")
        api (u/API. sync-handler async-handler namespace)]
    (register-api api)))

(defn removeJavascriptObject
  "Remove the API object with supplied namespace."
  [namespace]
  (swap! apis dissoc namespace))

(defn callHandler
  "Call handlers registered in Web"
  [])

(defn disableJavascriptDialogBlock
  "Not implemented"
  [])

(defn setJavascriptCloseWindowListener
  "Not implemented"
  [])

(defn hasJavascriptMethod
  "Test whether the handler exist in Web"
  [method-name]
  true)

(defn setWebContentsDebuggingEnabled
  "Not implemented"
  [])
