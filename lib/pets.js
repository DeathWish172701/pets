'use babel';

import PetsView from './pets-view';
import { CompositeDisposable } from 'atom';

export default {

  petsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.petsView = new PetsView(state.petsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.petsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.petsView.destroy();
  },

  serialize() {
    return {
      petsViewState: this.petsView.serialize()
    };
  },

  toggle() {
    console.log('Pets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
