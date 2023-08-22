import React, { PureComponent, CSSProperties, RefObject, ReactNode } from 'react';
import { Client } from '@widgetbot/embed-api';
import { Embed, Root } from './elements';
import { generateUUID, searchParams } from './util';

interface Props {
  server?: string;
  channel?: string;
  shard?: string;
  username?: string;
  avatar?: string;
  token?: string;
  notifications?: boolean;
  notificationTimeout?: number;
  accessibility?: string[];
  settingsGroup?: string;
  defer?: boolean;
  className?: string;
  onAPI?: (api: Client) => void;
  style?: CSSProperties;
  height?: number | string;
  width?: number | string;
  focusable?: boolean;
  options?: Record<string, string>;
  showChatButtonLabel?: string;
  hideChatButtonLabel?: string;
}
interface Props {
  server?: string;
  channel?: string;
  shard?: string;
  username?: string;
  avatar?: string;
  token?: string;
  notifications?: boolean;
  notificationTimeout?: number;
  accessibility?: string[];
  settingsGroup?: string;
  defer?: boolean;
  className?: string;
  onAPI?: (api: Client) => void;
  style?: CSSProperties;
  height?: number | string;
  width?: number | string;
  focusable?: boolean;
  options?: Record<string, string>;
  showChatButtonLabel?: string;
  hideChatButtonLabel?: string;
}

interface State {
  url: string | null;
  id: string;
  isChatVisible: boolean;
}

class WidgetBot extends PureComponent<Props, State> {
  static defaultProps: Props = {
    server: '299881420891881473',
    shard: 'https://e.widgetbot.io',
    options: {},
    defer: false,
    focusable: true,
    showChatButtonLabel: 'Show Chat',
    hideChatButtonLabel: 'Hide Chat',
  };
class WidgetBot extends PureComponent<Props, State> {
  static defaultProps: Props = {
    server: '299881420891881473',
    shard: 'https://e.widgetbot.io',
    options: {},
    defer: false,
    focusable: true,
    showChatButtonLabel: 'Show Chat',
    hideChatButtonLabel: 'Hide Chat',
  };

  state: State = {
    url: null,
    id: generateUUID(),
    isChatVisible: true,
  };

  api: Client = new Client({
    id: this.state.id,
    iframe: null as RefObject<HTMLIFrameElement> | null,
  });
  api: Client = new Client({
    id: this.state.id,
    iframe: null as RefObject<HTMLIFrameElement> | null,
  });

  static getDerivedStateFromProps(props: Props, state: State): Partial<State> | null {
    // ... (remaining code remains the same)
  }

  componentDidMount() {
    // ... (remaining code remains the same)
  }

  toggleChatVisibility = (): void => {
    this.setState((prevState) => ({
      isChatVisible: !prevState.isChatVisible,
    }));
  };

  render() {
    const {
      defer,
      className,
      style,
      height,
      width,
      focusable,
      showChatButtonLabel,
      hideChatButtonLabel,
    } = this.props;
    const { isChatVisible } = this.state;

    return (
      <div>
        <div className={className} style={{ ...Root({ width, height }), ...style }}>
          {isChatVisible && (
            <iframe
              src={defer ? '' : this.state.url}
              ref={(ref) => (this.api.iframe = ref)}
              style={Embed}
              tabIndex={focusable ? undefined : -1}
              allow="clipboard-write; fullscreen"
              title="Discord chat embed"
            />
          )}
        </div>
        <button onClick={this.toggleChatVisibility}>
          {isChatVisible ? hideChatButtonLabel : showChatButtonLabel}
        </button>
      </div>
    );
  }
    return (
      <div>
        <div className={className} style={{ ...Root({ width, height }), ...style }}>
          {isChatVisible && (
            <iframe
              src={defer ? '' : this.state.url}
              ref={(ref) => (this.api.iframe = ref)}
              style={Embed}
              tabIndex={focusable ? undefined : -1}
              allow="clipboard-write; fullscreen"
              title="Discord chat embed"
            />
          )}
        </div>
        <button onClick={this.toggleChatVisibility}>
          {isChatVisible ? hideChatButtonLabel : showChatButtonLabel}
        </button>
      </div>
    );
  }
}

export default WidgetBot;

export default WidgetBot;
