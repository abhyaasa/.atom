;; .emacs

; (setq debug-on-error t)
; (setq debug-on-error nil)

(setq mac-command-key-is-meta nil)

(setq HOME "/Users/home/Documents/")
(setq emacs-home "/Users/home/System/lib/emacs/")
(add-to-list 'load-path emacs-home)

(defun unfill-paragraph ()
  (interactive)
  (let ((fill-column (point-max)))
  (fill-paragraph nil)))
(global-set-key "\C-\M-q" 'unfill-paragraph)

(setq py-python-command "python")

;; added rcfile args and removed "-i"
(setq explicit-bash-args '("--noediting" "--rcfile" "~/.bash_profile")) 

(desktop-save-mode 1)

(require 'chaynes)

;;(require 'arduino-mode)

(setq ispell-program-name "/opt/local/bin/aspell")

(find-file "~/Favorites")

