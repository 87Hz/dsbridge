(ns util)

(defn get-global
  "Get a global varibale"
  [var-name]
  (let [global js/window]
    (aget global var-name)))
