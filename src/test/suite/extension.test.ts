import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Find widget test', async () => {
		const initialText = "aaa\nbbb\nccc\n";
		const doc = await vscode.workspace.openTextDocument({
			content: initialText,
		});

		await vscode.window.showTextDocument(doc);

		const activeTextEditor = vscode.window.activeTextEditor;
		assert.ok(activeTextEditor);

		activeTextEditor.selection = new vscode.Selection(0, 0, 0, 0);

		await vscode.commands.executeCommand("editor.actions.findWithArgs", {
			searchString: "bbb",
		});
		await vscode.commands.executeCommand<void>("editor.action.nextMatchFindAction")

		assert.ok(activeTextEditor.selection.isEqual(new vscode.Selection(1, 0, 1, 3)));
	});
});
