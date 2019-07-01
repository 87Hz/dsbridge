(ns util)

(defrecord API [sync-handler async-handler namespace])

(defn return-value [evt data]
  (let [res (js/JSON.stringify #js {:data data})]
    (set! (.-returnValue evt) res)))

(defn is-sync-call [js-arg]
  (nil? (.-_dscbstub js-arg)))
