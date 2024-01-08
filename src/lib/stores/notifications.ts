import { writable } from "svelte/store";
import { timer } from "rxjs";

export type Notification = {
  id: string;
  type: "danger" | "success" | "info";
  message: string;
  timeout: number;
};

function createNotificationStore() {
  const _notifications = writable<Notification[]>([]);

  function send(
    message: Notification["message"],
    type: Notification["type"],
    timeout: Notification["timeout"]
  ) {
    _notifications.update((state) => {
      const id = crypto.randomUUID();
      timer(timeout).subscribe(() => {
        deleteById(id);
      });
      return state.concat({ id, type, message, timeout });
    });
  }

  function deleteById(_id: Notification["id"]) {
    _notifications.update((state) => state.filter(({ id }) => id !== _id));
  }

  const { subscribe } = _notifications;

  return {
    subscribe,
    danger: (msg: string, timeout: number) => send(msg, "danger", 5000),
    success: (msg: string, timeout: number) => send(msg, "success", 5000),
    info: (msg: string, timeout: number) => send(msg, "info", 1000),
    deleteById: (id: string) => deleteById(id)
  };
}

export const notifications = createNotificationStore();
