import SummaryTool from "./main";
import { VideoDownloader } from "./Download";
import {
	ButtonComponent,
	DropdownComponent,
	ToggleComponent,
	MarkdownView,
	Modal,
	Notice,
	Setting,
	TextAreaComponent,
    TextComponent,
} from "obsidian";

export class PluginModal extends Modal {

	// Variables
    url: string | null;
    pdf_file: string | null;

	// Input Components
    promptField: TextComponent;

	// Button Components
    generateButton: ButtonComponent;
    cancelButton: ButtonComponent;
    
	// Downloaders 
	videoDownloader: VideoDownloader;

    constructor(
        plugin: any
    ) {
        super(plugin.app);
		this.url = null;
		this.pdf_file = null;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.setText("Summarize and generate notes from URLs and PDFs.");

        // Input Container
        const container = contentEl.createDiv();
		container.className = "st_plugin_container";

        // URL Input
		container.createEl("h3", { text: "Type in your URL" });
        this.promptField = new TextComponent(container);
        this.promptField.inputEl.placeholder = "Enter URL link";
		this.promptField.inputEl.className = "st_url_input";
		this.promptField.onChange((value) => {
			this.url = value;
		});

        // PDF Input
		container.createEl("h3", { text: "Place your PDF" });

        // Button Container 
        const buttonContainer = container.createDiv();
		buttonContainer.className = "st_button_container";

		const cancelButton = new ButtonComponent(buttonContainer);
		cancelButton.buttonEl.className = "st_cancel_button";
		cancelButton.buttonEl.style.backgroundColor = "#b33939";
		cancelButton.setButtonText("Cancel").onClick(() => {
			this.close();
		});

		// Generate button for the modal.
		this.generateButton = new ButtonComponent(buttonContainer);
		this.generateButton.buttonEl.className = "st_generate_button";
		this.generateButton.buttonEl.style.backgroundColor = "#218c74";
		this.generateButton.setButtonText("Generate Notes").onClick(() => {
			this.generateButton.setButtonText("Loading...");
			this.generateButton.setDisabled(true);
			this.generateButton.buttonEl.style.backgroundColor =
				"rbga(33, 140, 116, 0.5)";

			// If the user has entered a URL, generate notes from the URL.
			if (this.url !== null) {
				console.log("Generating notes from URL.", this.url);
				this.generateVideoNotes();

			// If the user has uploaded a PDF file, generate notes from the PDF.
			} else if (this.pdf_file !== null) {
				this.generatePDFNotes();

			// If the user has not entered a URL or uploaded a PDF file, display an error.
			} else {
				new Notice("Please enter a URL or upload a PDF file.");
				this.generateButton.setButtonText("Generate Notes");
				this.generateButton.setDisabled(false);
				this.generateButton.buttonEl.style.backgroundColor = "#218c74";
			}
		});
    }

	async generateVideoNotes() {
		let e = VideoDownloader.download(this.url);
		if (e !== null) {
			new Notice("Error downloading video.");
		}
	}

	async generatePDFNotes() {
		
	}
}