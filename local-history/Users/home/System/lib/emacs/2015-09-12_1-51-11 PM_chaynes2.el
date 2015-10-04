

(global-set-key "\C-zw" 'write-region)
(global-set-key "\C-z\C-y" 'py-shell)
(global-set-key "\C-z\C-a" 'auto-fill-mode)
(global-set-key "\C-zi" 'indent-region)

(set-face-background 'default "snow")

(setq completion-ignored-extensions
      (append '(".ps" ".so" ".io") completion-ignored-extensions))

(setq completion-ignore-case t)

(put 'eval-expression 'disabled nil)

(setq minibuffer-max-depth nil)

(setq html-use-highlighting nil)

(define-key global-map [(control h)] 'help-command)
;;------------------------------------------------------

(autoload 'outline-mode "outline-mode" "mode for simple indented outlines" nil t)
;; (eval-after-load "outline" '(require 'foldout))
(setq outline-regexp "[*^L]+")

(defun slip-mode ()
  (interactive)
  (four)
  (text-mode))
; (autoload 'html-mode "html" "custom html support" t)

(defun html-my-sig ()
  (interactive)
  (insert "<ADDRESS><A HREF=\"http://www.cs.indiana.edu/~chaynes\">Chris\
 Haynes</A> /
 <A HREF=\"mailto:chaynes@indiana.edu\">chaynes@indiana.edu</A></ADDRESS>"))

(make-variable-buffer-local 'screen-icon-title-format)

(defun html-br ()
       (interactive)
       (insert "<br>")
)
(global-set-key "\C-z\C-m" 'html-br)
;;-------------------------------------
(defun bs ()
  "Make ^H be backward-delete-char-untabify."
  (interactive)
  (define-key global-map [(control h)] 'backward-delete-char-untabify))

;; overrides abort-recursive-edit
(define-key global-map "\C-]" 'backward-char)

(define-key global-map "\e\C-]" 'backward-sexp)

(put 'downcase-region 'disabled nil)

(define-key Control-Z-prefix "\C-o" 'overwrite-mode)

(put 'upcase-region 'disabled nil)

(defvar html-mode-hook '() "Html mode hook")
(setq html-mode-hook (cons 'html-mode-hook html-mode-hook))
(defun html-mode-hook ()
  (local-set-key "\C-cf" 'font-lock-mode))

(define-key Control-Z-prefix "h" 'html-mode)

(define-key Control-Z-prefix "j" 'jde-mode)

(defun named-new-screen (name x y)
  "New screen with X stuff at top."
  (interactive "sScreen name: ")
  (new-screen name)
;;  (set-face-font 'default "-*-fixed-Bold-R-*-*-*-100-100-100-*-*-ISO8859-1")
  (select-frame (new-frame (list (cons 'name name)
                                 (cons 'left x)
                                 (cons 'top y)
                                 (cons 'width 81)
                                 (cons 'height 59)))))

(load "follow")
(global-set-key "\C-zf" 'follow-mode)
(global-set-key "\C-xf" 'follow-delete-other-windows-and-split)

(setq truncate-lines nil)
(setq truncate-partial-width-windows nil)
(setq pixel-vertical-clip-threshold 30)

(if (not window-system) (define-key global-map "\C-h" 'delete-backward-char))

(defun remove-returns ()
  "Remove CR from the end of each line in buffer."
  (interactive)
  (goto-char (point-min))
  (auto-fill-mode)
  (while (< (point) (point-max))
    (if (looking-at "[ \t]*$")
        (progn (next-line 1) (beginning-of-line) (newline))
      (end-of-line)
      (delete-char 1)
      (insert-string " "))))

(defun crlf ()
  "Convert ^M to newline."
  (interactive)
  (beginning-of-buffer)
  (while (re-search-forward "\^M" (eobp) t)
    (delete-backward-char 1)
    (if (not (looking-at "\n")) (newline))))

;; misc

(defun short()
  "Short frame for low resolution window."
  (interactive)
  (set-frame-position (selected-frame) 300 0)
  (set-frame-size (selected-frame) 81 43))
(define-key Control-Z-prefix "s" 'short)

;; (defun left-frame ()
;;   "New frame on left of large monitor."
;;   (interactive)
;;   (setq lframe (make-frame '((width . 81) (height . 72))))
;;   (set-frame-position lframe 100 0))
;; (define-key Control-Z-prefix "l" 'left-frame)

(defun bigwide ()
  "Long and wide frame for big monitor."
  (interactive)
  (set-frame-position (selected-frame) 650 0)
  (set-frame-size (selected-frame) 168 75)
  ; (split-window-horizontally)
  )
(define-key Control-Z-prefix "w" 'bigwide)

(defun smallwide ()
  "Long and wide frame for big monitor."
  (interactive)
  (set-frame-position (selected-frame) 0 0)
  (set-frame-size (selected-frame) 168 45)
  ; (split-window-horizontally)
  )
(define-key Control-Z-prefix "\C-w" 'smallwide)

(defun biglong ()
  "Long and narrow frame for big monitor."
  (interactive)
  (set-frame-position (selected-frame) 65 0)
  (set-frame-size (selected-frame) 84 75)
  ; (split-window-horizontally)
  )
(define-key Control-Z-prefix "l" 'biglong)

(setq fill-column 80)

(toggle-uniquify-buffer-names)

(setq comment-start ";")

(defun text-region-indent (arg)
  "Indent region 4 chars, or -4 if arg."
  (interactive "P")
  (indent-rigidly (region-beginning) (region-end) (* tab-width (if arg -1 1))))

(defun four ()
  "Four char tab stops."
  (interactive)
  (setq tab-width 4)
  (setq tab-stop-list '(4 8 12 16 20 24 28 32 36 40 44 48 52 56 60 64 68))
  ;; (untabify (point-min) (point-max))
)

(defun maybe-delete-indentation ()
  "If after indentation, delete 4 chars, else 1."
  (interactive)
  (if (and (= 0 (mod (current-column) 4))
           (looking-back "^ +"))
      (delete-backward-char 4)
      (delete-backward-char 1)))

(defun outline ()
  "MS outline mode"
  (interactive)
  (four)
  ;; (text-mode)
  (local-set-key "\C-i" 'tab-to-tab-stop) ; TAB key
  (setq indent-tabs-mode nil)
  (local-set-key "\C-\\" 'text-region-indent)
  (local-set-key "\C-?" 'maybe-delete-indentation) ; delete
  (local-set-key "\C-m" 'newline-and-indent))
(global-set-key "\C-zo" 'outline)

;;(defun my-text-mode ()
;;  (local-set-key "\C-m" 'newline-and-indent))
;;(add-hook 'text-mode-hook 'my-text-mode) ;; causes max-level-depth error

(add-hook 'text-mode-hook 'outline) ;; causes max-level-depth error

(defun other-window-2 ()
  (interactive)
  (other-window 2)
)
