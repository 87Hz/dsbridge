(ns util)

(defn get-global
  "Get a global varibale"
  [var-name]
  (let [global js/window]
    (js->clj (aget global var-name))))
