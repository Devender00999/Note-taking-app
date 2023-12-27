import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DBService<T> {
  // to save data in localstorage
  saveData<T>(dbName: string, data: any) {
    localStorage.setItem(dbName, JSON.stringify(data));
  }

  getData<T>(dbName: string) {
    return JSON.parse(localStorage.getItem(dbName) || "[]") as T;
  }
}
