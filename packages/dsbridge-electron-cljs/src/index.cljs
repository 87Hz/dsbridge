(ns index
  (:require [handlers :as h]))

;; ==========================================================
;; Web (Renderer)
;;
(defonce ipc-renderer (atom nil))

(defn call [method jsArg]
  (let [arg (js/JSON.parse jsArg)
        cb (.-_dscbstub arg)]
    (prn (str "Calling " method " with arg " jsArg))
    (js/JSON.stringify #js {:data 123})))
    ; (str {:data (.sendSync ^js @ipc-renderer method arg)})))

(defn initWeb [ipcRenderer]
  (let [global js/window
        fn-registry #js {:_obs #js []}
        dsbridge #js {:call call}]
    (reset! ipc-renderer ipcRenderer)
    (aset global "dscb" 0)
    (aset global "_dsInit" false)
    (aset global "_dsf" fn-registry)
    (aset global "_dsaf" fn-registry)
    (aset global "_dsbridge" dsbridge)
    (prn "DSBridge for web initialized.")))

;; ==========================================================
;; Electron (Main)
;;
(defonce ipc-main (atom nil))
(defonce host-fns (atom {}))

(defn register
  ([channel handler]
   (.on ^js @ipc-main channel handler))
  ([[channel handler]]
   (register channel handler)))

(defn initElectron [ipcMain]
  (let [builtin-handlers [h/ds-init
                          h/has-native-method
                          h/disable-javascript-dialog-block]]
    (reset! ipc-main ipcMain)
    (map register builtin-handlers)))


;; ==========================================================
;; ESModule Exports
;;
;;
(def exports #js {:initWeb initWeb
                  :initElectron initElectron
                  :register register})


