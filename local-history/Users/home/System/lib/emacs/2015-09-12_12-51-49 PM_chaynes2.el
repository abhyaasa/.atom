
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

;; ---------------------------------------------------------------------------

(defun name-directory (name)
  "Prompt for NAME and display directory line in minibuffer.
If there are more lines containing NAME, cursor remains at the end of the
minibuffer and next line is shown when RETURN is pressed."
  (interactive "sName: ")
  (save-window-excursion
   (find-file "~/.namedir")
   (goto-char (point-min))
   (if (not (search-forward name (point-max) t))
       (message (concat "\"" name "\" not found in ~/.namedir"))
     (let ((more t))
       (while more
     (beginning-of-line)
     (let ((msg (buffer-substring (progn (beginning-of-line) (point))
                      (progn (end-of-line) (point)))))
       (forward-line 1)
       (if (not (search-forward name (point-max) t))
           (progn (setq more nil) (message msg))
         (read-from-minibuffer msg "" nil nil))))))))

(defun noop ()
  "Do nothing, quietly."
  (interactive))

(defun line-to-top-of-window ()
  "Puts current line at top of window."
  (interactive)
  (recenter 0))

(defun line-to-bottom-of-window ()
  "Puts current line at bottom of window."
  (interactive)
  (recenter '-))

(defun save-and-kill-current-buffer ()
  "Save the current buffer and then kill it."
  (interactive)
  (if (buffer-file-name) (save-buffer))
  (kill-buffer (current-buffer)))

(defun buffer-process-send-string (arg)
  "Prompt for a string and send it to the current process, followed by a
return.  This is useful, for example, when the power of scheme-send-input
gets in the way, as when responding to the Chez interrupt handler menu."
  (interactive "sString to send process: ")
  (process-send-string (get-buffer-process (current-buffer))
               (concat arg "\n")))

(defun top-of-window ()
  "Position point at first line of window."
  (interactive)
  (move-to-window-line 0))

(defun bottom-of-window ()
  "Position point at last line of window."
  (interactive)
  (move-to-window-line -1))

(defun insert-file-name-with-completion (name)
  "Prompts for a file or directory name and inserts that name after point.
The name may be non-existent.  Useful in Shell mode."
  (interactive "FInsert file name: ")
  (insert  name))

(defun shell-command-on-buffer (command)
  "Prompt for a shell command, and then pipe the whole buffer through it."
  (interactive "sShell command on buffer: ")
  (shell-command-on-region (point-min) (point-max) command))

(defun shell-other-window ()
  "Switch-to-buffer-other-window and then Shell."
  (interactive)
  (switch-to-buffer-other-window "*shell*")
  (shell))

(defun hangfill-paragraph ()
  "Fill paragraph at or after point with hanging indentation.
The indentation of the first line is unchanged and all other lines
get the indentation of the second line."
  (interactive)
  (let (fill-prefix)
    (save-excursion
      (forward-paragraph)
      (or (bolp) (newline 1))
      (let ((end (point)))
    (backward-paragraph)
    (let ((start (point)))
      (forward-line 2)
      (setq fill-prefix (buffer-substring
                 (point)
                 (progn (skip-chars-forward " \t") (point))))
      (fill-region-as-paragraph start end))))))

(defun newline-and-indent-relative-maybe ()
  "Newline followed by indentation of previous line."
  (interactive)
  (newline)
  (indent-relative-maybe))

(setq initial-major-mode 'lisp-interaction-mode)

;;; Advise kill-all-local-variables not to kill server-buffer-clients.
(fset 'old-kill-all-local-variables
      (symbol-function 'kill-all-local-variables))
(defun kill-all-local-variables ()
  (let ((tmp (assoc 'server-buffer-clients (buffer-local-variables))))
    (old-kill-all-local-variables)
    (if tmp
    (setq server-buffer-clients (cdr tmp)))))

;; scheme support
(autoload 'scheme-mode "iuscheme" "Major mode for Scheme." t)
(autoload 'run-scherintpme "iuscheme" "Switch to interactive Scheme buffer." t)
(setq auto-mode-alist (append '(("\\.ss" . scheme-mode)
                                ("\\.sch$" . scheme-mode))
                              auto-mode-alist))
(setq scheme-program-name "scheme c:/lib/scheme/.schemerc")
(autoload 'balanced-toggle "balanced" "Toggle balanced ``mode''" t)
(autoload 'balanced-on "balanced" "Turn on balanced ``mode''" t)
(setq scheme-mode-hook '(chaynes-scheme-mode-hook turn-on-auto-fill balanced-on))
(setq inferior-scheme-mode-hook '(balanced-on))
(setq scheme-indentation-style 'minimal)
; (define-key scheme-mode-map "\C-e" 'end-of-line-blink)
; (define-key scheme-mode-map "\C-cf" 'font-lock-mode)
(defun end-of-line-blink ()
  "end-of-line and then blink balanced open paren"
  (interactive)
  (end-of-line 1)
  (blink-matching-open))
(defun chaynes-scheme-mode-hook ()
  "Run when scheme mode starts."
  (modify-syntax-entry ?\| "  23b")
  (modify-syntax-entry ?# "_ 14")
  ;; put stuff for scheme.el scheme-font-lock-keywords-2 update here ???
)

(global-set-key "\C-x\C-z" 'suspend-emacs)

(setq default-major-mode 'text-mode)
(setq indent-tabs-mode nil)
(setq default-fill-column 75)

(setq blink-matching-paren-distance 100000)
(setq TeX-dvi-print-command "dvipr")
(setq TeX-dvi-preview-command "xtex")
(setq emacs-lisp-mode-hook 'turn-on-auto-fill)
(setq text-mode-hook 'turn-on-auto-fill)

(setq auto-mode-alist (append '(("\\.bib$" . bibtex-mode)
                ("\\.sml$" . sml-mode))
                  auto-mode-alist))

(autoload 'sml-mode "sml-mode" "Major mode for editing SML" nil t)

(autoload 'bibtex-mode "bibtex" "Major mode for editing BibTeX files" nil t)

(put 'downcase-region 'disabled t)
(put 'upcase-region 'disabled t)
(put 'narrow-to-region 'disabled nil)
(put 'eval-expression 'disabled nil)

(defun myspell-word ()
  "Baskspace and then ispell-word"
  (interactive)
  (save-excursion
    (backward-word 1)
    (ispell-word)))

(define-key Control-Z-prefix " " 'myspell-word)

(define-key Control-Z-prefix "\\" 'shell-command-on-region)

(autoload 'zcat-buffer "zcat")
(setq auto-mode-alist (append (list '("\\.Z$".zcat-buffer)) auto-mode-alist))

(setq fast-shell-command-name "bash")

(defun fast-shell-command ()
  "execute fast-shell-command-name in shell"
  (interactive)
  (save-some-buffers t)
  (switch-to-buffer-other-window "*shell*")
  (insert fast-shell-command-name)
  (comint-send-input))
(define-key Control-Z-prefix ";" 'fast-shell-command)

(defun no-ctrl-ms ()
  "remove all ^M characters from file"
  (interactive)
  (save-excursion
    (goto-char 1)
    (while (search-forward "" nil t)
      (replace-match "" nil t))))
(define-key Control-Z-prefix "m" 'no-ctrl-ms)

(defun unfill-buffer ()
  (interactive)
  (goto-char (point-min))
  (while (< (point) (point-max))
    (unfill-paragraph)
    (forward-paragraph)))
(global-set-key "\C-zu" 'unfill-buffer)
