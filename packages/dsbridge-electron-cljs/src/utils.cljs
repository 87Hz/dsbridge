(ns utils)

(defrecord API [sync-handler async-handler namespace])

(defn return-value [data]
  (let [res (js/JSON.stringify #js {:data data})]
    (fn [evt _]
      (set! (.-returnValue evt) res))))

(defn is-sync-call [arg]
  (nil? (.-_dscbstub arg)))
