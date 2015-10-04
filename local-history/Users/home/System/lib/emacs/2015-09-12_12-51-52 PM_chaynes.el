;; chaynes.el -- Chris Haynes's favorite view of the emacs world.

(column-number-mode 1)
;; get rid of the "this file does not end in newline" atrocity
(add-hook 'after-init-hook '(lambda () (setq require-final-newline nil)))

(setq dirtrack-list '("^.*[^ ]+:\\(.*\\) [0-9]*#" 1 nil))
(add-hook 'shell-mode-hook 'dirtrack-mode)

(defun enscript-buffer ()
  (interactive)
  (shell-command-on-region (point-min) (point-max)
    (concat "enscript -2Gh -r --header=\'" (buffer-name) "\'")))

(global-set-key  "\M-q" 'save-buffers-kill-emacs)
(global-set-key "\M-q" 'fill-paragraph)

(progn ; space for minibuffer completion
  (define-key minibuffer-local-completion-map " " 'minibuffer-complete-word)
  (define-key minibuffer-local-filename-completion-map " " 'minibuffer-complete-word)
  (define-key minibuffer-local-must-match-filename-map " " 'minibuffer-complete-word))

(defvar Control-Z-prefix (make-keymap) "Prefix for control-Z.")
(global-set-key  "\C-z" Control-Z-prefix)

(setq auto-mode-alist
      (append '(("\\.ol$" . outline-mode)
                ("\\.rb$" . ruby-mode)
                ("\\.java$" . java-mode)
		("\\.el$" . emacs-lisp-mode)
                ("\\.itx$" . text-mode)
                ("\\.rst$" . text-mode)
                ("emacs\\.ini$" . lisp-mode)
                ("\\.emacs$" . lisp-mode)
                ("\\.pxml$" . text-mode)
                ("\\.slip$" . slip-mode)
                ("\\schemerc$" . scheme-mode)
                ("\\.sth$" . latex-mode)
                ("\\.s$" . scheme-mode)
                ("\\.mh" . mh-letter-mode)
                ("\\.t$" . text-mode)
                ("\\.htx" . latex-mode)
                ("\\.doc$" . text-mode)
                ("\\.json$" . javascript-mode))
              auto-mode-alist))

;;(set-frame-position (selected-frame) 400 0)
;;(set-frame-size (selected-frame) 82 45)
(if (string-match "Carbon" (emacs-version))
    (tool-bar-mode 0) ;; var tool-bar-mode customized in groups mouse ;;frames
    )

(defun outline-hook ()
  "Invoke outline if 'outline' is in first line (case-insensitive)."
  ;; (setq case-fold-search t) save-excursion
  )

(defvar fix-mismatch nil
  "*True if mismatched closing delimiters are to be replaced by their matching
open delimiter.")

(setq lpr-command "/Users/home/bin/print")

(defun rprint ()
  (interactive)
  (shell-command-on-buffer "/Users/home/bin/rprint")
)

(defun dprint ()
  (interactive)
  (shell-command-on-buffer "/Users/home/bin/dprint")
)

(defun eprint ()
  (interactive)
  (shell-command-on-buffer "/Users/home/bin/eprint")
)

(defun fprint ()
  (interactive)
  (shell-command-on-buffer "/Users/home/bin/fprint")
)

(setq dired-listing-switches "-alb")
(setq TeX-dvi-print-command "ptex")
(setq search-delete-char ?\^h)
(setq search-quote-char ?\^\\)
(setq mail-header-separator "====")
(setq inhibit-startup-message t)
(setq delete-auto-save-files t)
(setq require-final-newline t)
(setq window-min-height 1)

(defvar ESC-O-prefix (make-keymap) "Keymap for arrow and keypad keys")
(global-set-key "\eO" ESC-O-prefix)
; (global-set-key "\e[" ESC-O-prefix)
(define-key ESC-O-prefix "D" 'backward-char)        ; <-
(define-key ESC-O-prefix "C" 'forward-char)     ; ->
(define-key ESC-O-prefix "A" 'previous-line)        ; up-arrow
(define-key ESC-O-prefix "B" 'next-line)        ; dn-arrow
(define-key ESC-O-prefix "H" 'home)         ; Home

;;(defvar Control-Z-prefix (make-keymap) "Prefix for control-Z.")
;;(global-set-key  "\C-z" Control-Z-prefix)

(define-key Control-Z-prefix "|" 'shell-command-on-buffer)
(define-key Control-Z-prefix "!" 'shell-other-window)
(define-key Control-Z-prefix "," 'top-of-window)
(define-key Control-Z-prefix "." 'bottom-of-window)
(define-key Control-Z-prefix "\C-a" 'run-alt-scheme)
(define-key Control-Z-prefix "\C-b" 'line-to-bottom-of-window)
(define-key Control-Z-prefix "\C-c" 'run-scheme)
(define-key Control-Z-prefix "\C-d" 'mark-defun)
(define-key Control-Z-prefix "\C-e" 'mark-sexp)
(define-key Control-Z-prefix "\C-f" 'find-file-other-window)
(define-key Control-Z-prefix "\C-g" 'abort-recursive-edit)
(define-key Control-Z-prefix "\C-h" 'backward-kill-sentence)
(define-key Control-Z-prefix "\C-l" 'line-to-top-of-window)
(define-key Control-Z-prefix "\C-m" 'manual-entry)
(define-key Control-Z-prefix "\C-n" 'gnus)
(define-key Control-Z-prefix "\C-r" 'inf-ruby)
(define-key Control-Z-prefix "\C-t" 'toggle-read-only)
(define-key Control-Z-prefix "\C-x" 'buffer-process-send-string)
(define-key Control-Z-prefix "\C-z" 'help-command)
(define-key Control-Z-prefix "a" 'append-to-file)
(define-key Control-Z-prefix "b" 'switch-to-buffer-other-window)
(define-key Control-Z-prefix "c" 'scheme-mode)
(define-key Control-Z-prefix "f" 'insert-file-name-with-completion)
(define-key Control-Z-prefix "g" 'goto-line)
(define-key Control-Z-prefix "n" 'name-directory)
(define-key Control-Z-prefix "\C-p" 'ispell-buffer)
(define-key Control-Z-prefix " " 'ispell-word)
(define-key Control-Z-prefix "\C-i" 'ispell-complete-word)
(define-key Control-Z-prefix "q" 'quoted-insert)
(define-key Control-Z-prefix "p" 'print-buffer)
(define-key Control-Z-prefix "p" 'fprint)
(define-key Control-Z-prefix "r" 'ruby-mode)
;; (define-key Control-Z-prefix "s" 'tags-search)
(define-key Control-Z-prefix "\C-s" 'tags-query-replace)
(define-key Control-Z-prefix "t" 'text-mode)
(define-key Control-Z-prefix "x" 'electric-command-history)

(global-set-key "\C-\M-\\" 'call-last-kbd-macro)
(global-set-key "\C-^" 'noop)
(global-set-key "\C-h" 'delete-backward-char) ; overrides help-char
(global-set-key "\C-x " 'set-mark-command)
(global-set-key "\C-x%" 'query-replace-regexp)
(global-set-key "\C-x\C-@" 'set-mark-command)
(global-set-key "\C-x\C-k" 'save-and-kill-current-buffer)
(global-set-key "\C-x!" 'shell)
(global-set-key "\C-x_" 'shrink-window)
(global-set-key "\C-x," 'beginning-of-buffer)
(global-set-key "\C-x." 'end-of-buffer)       ; overrides set-fill-prefix
(global-set-key "\C-x?" 'apropos)
(global-set-key "\C-xc" 'calendar)
(global-set-key "\C-xm" 'man)
(global-set-key "\C-xr" 'rprint) ; overrides copy-rectangle-to-register
(global-set-key "\C-zv" 'view-file)
(global-set-key [(control delete)] 'backward-kill-word)
(global-set-key "\es" 'center-line)

;;(setq command-line-default-directory HOME)
;; (load "django-html-mode.el")

;; (require 'iuscheme)
;; (require 'inf-ruby)
;; (require 'scala)
;; (require 'ch-java) ; works with 21.3 but not emacs 22.2: java.emacs doesn't load

;; (require 'rst)
;; (add-hook 'text-mode-hook 'rst-text-mode-bindings)

(tool-bar-mode -1)

(autoload 'markdown-mode "markdown-mode"
   "Major mode for editing Markdown files" t)
;;(add-to-list 'auto-mode-alist '("\\.text\\'" . markdown-mode))
(add-to-list 'auto-mode-alist '("\\.markdown\\'" . markdown-mode))
(add-to-list 'auto-mode-alist '("\\.md\\'" . markdown-mode))

;; (require 'ch-python)
;; (require 'table)
;; (require 'chaynes-c-asm) ;; C and makefiles

(provide 'chaynes)
