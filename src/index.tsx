import * as React from 'react';
import { PureComponent, CSSProperties, RefObject } from 'react';
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

interface State {
  url: string | null;
  id: string;
  isChatVisible: boolean;
  hasError: boolean;
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

  state: State = {
    url: null,
    id: generateUUID(),
    isChatVisible: true,
    hasError: false,
  };

  api: Client = new Client({
    id: this.state.id,
    iframe: null,
  });

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('An error occurred in WidgetBot:', error, errorInfo);
    this.setState({
      hasError: true,
    });
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
    const { isChatVisible, hasError } = this.state;

    if (hasError) {
      // Display an error message or component
      return <div>Sorry, something went wrong.</div>;
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
